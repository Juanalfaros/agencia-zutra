
import contentfulManagement from 'contentful-management';
const { createClient } = contentfulManagement;
import * as dotenv from 'dotenv';
dotenv.config();

const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';

async function main() {
    try {
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment(ENVIRONMENT_ID);

        console.log('🚀 Step 1: Creating "Category" Content Type...');
        let categoryType;
        try {
            categoryType = await environment.getContentType('category');
            console.log('   ✅ Content Type "Category" already exists.');
        } catch (e) {
            categoryType = await environment.createContentTypeWithId('category', {
                name: 'Category',
                displayField: 'name',
                fields: [
                    { id: 'name', name: 'Name', type: 'Symbol', required: true, localized: false },
                    { id: 'slug', name: 'Slug', type: 'Symbol', required: true, localized: false },
                    { id: 'order', name: 'Order', type: 'Integer', required: false, localized: false }
                ]
            });
            await categoryType.publish();
            console.log('   ✅ Content Type "Category" created and published.');
        }

        console.log('🚀 Step 2: Seeding categories...');
        const categoriesToSeed = [
            { name: 'Desarrollo & Web', slug: 'desarrollo', order: 1 },
            { name: 'Marketing Directo', slug: 'marketing', order: 2 },
            { name: 'Identidad Visual', slug: 'visual', order: 3 },
            { name: 'Tecnología', slug: 'tecnologia', order: 4 }
        ];

        const categoryEntriesMap = new Map();

        for (const cat of categoriesToSeed) {
            const entries = await environment.getEntries({
                content_type: 'category',
                'fields.slug[in]': cat.slug
            });

            let entry;
            if (entries.items.length > 0) {
                entry = entries.items[0];
                entry.fields = {
                    name: { 'en-US': cat.name },
                    slug: { 'en-US': cat.slug },
                    order: { 'en-US': cat.order }
                };
                entry = await entry.update();
                console.log(`   🔹 Updated category: ${cat.name}`);
            } else {
                entry = await environment.createEntry('category', {
                    fields: {
                        name: { 'en-US': cat.name },
                        slug: { 'en-US': cat.slug },
                        order: { 'en-US': cat.order }
                    }
                });
                console.log(`   ✨ Created category: ${cat.name}`);
            }
            await entry.publish();
            categoryEntriesMap.set(cat.slug, entry.sys.id);
        }

        console.log('🚀 Step 3: Adding "categoryRef" field to "service" Content Type...');
        let serviceType = await environment.getContentType('service');
        const hasCategoryRef = serviceType.fields.some(f => f.id === 'categoryRef');

        if (!hasCategoryRef) {
            serviceType.fields.push({
                id: 'categoryRef',
                name: 'Category Reference',
                type: 'Link',
                linkType: 'Entry',
                required: false,
                localized: false,
                validations: [
                    { linkContentType: ['category'] }
                ]
            });
            serviceType = await serviceType.update();
            console.log('   ✅ Added "categoryRef" field to "service".');
        } else {
            console.log('   ✅ "categoryRef" field already exists in "service".');
        }

        console.log('   🚀 Publishing "service" content type to ensure fields are active...');
        serviceType = await environment.getContentType('service');
        await serviceType.publish();
        console.log('   ✅ Published.');

        console.log('   ⏳ Waiting 5 seconds for propagation...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('🚀 Step 4: Migrating Service entries to use references...');
        const services = await environment.getEntries({
            content_type: 'service',
            limit: 1000
        });

        for (const service of services.items) {
            const currentCatSlug = service.fields.category?.['en-US'];
            if (currentCatSlug && categoryEntriesMap.has(currentCatSlug)) {
                const categoryId = categoryEntriesMap.get(currentCatSlug);

                // Update specific field if it's not already set correctly
                service.fields.categoryRef = {
                    'en-US': {
                        sys: {
                            type: 'Link',
                            linkType: 'Entry',
                            id: categoryId
                        }
                    }
                };

                const updated = await service.update();
                await updated.publish();
                console.log(`   🔗 Linked service "${service.fields.title['en-US']}" to category "${currentCatSlug}"`);
            } else {
                console.log(`   ⚠️  Service "${service.fields.title?.['en-US'] || service.sys.id}" has unknown category "${currentCatSlug}"`);
            }
        }

        console.log('\n✅ All categories set up and services migrated successfully!');

    } catch (error) {
        console.error('❌ Error in setup script:', error);
    }
}

main();
