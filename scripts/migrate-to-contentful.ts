/**
 * Contentful Migration Script
 * 
 * Migrates existing data from TypeScript files to Contentful CMS,
 * including automated asset upload for images.
 */

import contentfulManagement from 'contentful-management';
const { createClient } = contentfulManagement;
import { blogPosts, authors } from '../src/data/blog';
import { cases } from '../src/data/casos';
import { heroSlides } from '../src/data/hero';
import { services } from '../src/data/servicios';
import { founders } from '../src/data/founders';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config();

const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';

// Asset Cache to avoid double uploads
const assetCache = new Map<string, any>();

/**
 * Helper to resolve local image paths based on filename or metadata
 */
function resolveLocalPath(image: any): string | null {
    if (!image) return null;

    // If it's already a string (path or URL)
    if (typeof image === 'string') {
        if (image.startsWith('http')) return null; // Remote URL
        return path.resolve(process.cwd(), image);
    }

    // If it's an object (ImageMetadata from Astro)
    if (image.src) {
        // In bundled code with 'empty' loader, src might be undefined or {}.
        // We'll rely on the mapping below for known images.
        return null;
    }

    return null;
}

/**
 * Hardcoded mapping for known images used in data files
 * since esbuild might hide the original paths during bundling.
 */
const IMAGE_RESOURCES_MAP: Record<string, string> = {
    // Founders
    'camilo-bustamante.webp': 'src/assets/img/fundadores/camilo-bustamante.webp',
    'juan-alfaro.webp': 'src/assets/img/fundadores/juan-alfaro.webp',
    'camilo-avatar.webp': 'src/assets/img/fundadores/camilo-avatar.webp',
    'juan-avatar.webp': 'src/assets/img/fundadores/juan-avatar.webp',

    // Hero
    'landing.webp': 'src/assets/img/hero/landing.webp',
    'produccion.webp': 'src/assets/img/hero/produccion.webp',
    'logo.webp': 'src/assets/img/hero/logo.webp',

    // Casos
    'iej.webp': 'src/assets/img/casos/iej.webp',
    'iej-gallery-1.webp': 'src/assets/img/casos/iej-gallery-1.webp',
    'iej-gallery-2.webp': 'src/assets/img/casos/iej-gallery-2.webp',
    'isinova.webp': 'src/assets/img/casos/isinova.webp',
    'isinova-gallery-1.webp': 'src/assets/img/casos/isinova-gallery-1.webp',
    'isinova-gallery-2.webp': 'src/assets/img/casos/isinova-gallery-2.webp',
    'comprendeme.webp': 'src/assets/img/casos/comprendeme.webp',
    'comprendeme-gallery-1.webp': 'src/assets/img/casos/comprendeme-gallery-1.webp',
    'comprendeme-gallery-2.webp': 'src/assets/img/casos/comprendeme-gallery-2.webp',
    'comprendeme-gallery-3.webp': 'src/assets/img/casos/comprendeme-gallery-3.webp',
    'cordoneria-chike.webp': 'src/assets/img/casos/cordoneria-chike.webp',
    'feomalofeo.webp': 'src/assets/img/casos/feomalofeo.webp',
    'flipeame.webp': 'src/assets/img/casos/flipeame.webp',
    'tubinger.webp': 'src/assets/img/casos/tubinger.webp',
    'vibrando-kine.webp': 'src/assets/img/casos/vibrando-kine.webp',
};

/**
 * Find asset by name in the local filesystem
 */
function findAssetPath(name: string): string | null {
    // Check map first
    if (IMAGE_RESOURCES_MAP[name]) {
        return path.resolve(process.cwd(), IMAGE_RESOURCES_MAP[name]);
    }

    // Try common locations
    const possiblePaths = [
        path.resolve(process.cwd(), 'src/assets/img/casos', name),
        path.resolve(process.cwd(), 'src/assets/img/blog', name),
        path.resolve(process.cwd(), 'src/assets/img/fundadores', name),
        path.resolve(process.cwd(), 'src/assets/img/hero', name),
    ];

    for (const p of possiblePaths) {
        if (fs.existsSync(p)) return p;
        if (fs.existsSync(p + '.webp')) return p + '.webp';
        if (fs.existsSync(p + '.png')) return p + '.png';
    }

    return null;
}

/**
 * Upload an image to Contentful Assets
 */
async function uploadAsset(
    environment: any,
    title: string,
    filePath: string,
    description?: string
): Promise<any> {
    try {
        if (assetCache.has(filePath)) return assetCache.get(filePath);

        if (!fs.existsSync(filePath)) {
            console.warn(`   ⚠️  Archivo no encontrado: ${filePath}`);
            return null;
        }

        const fileName = path.basename(filePath);
        console.log(`   📤 Subiendo asset: ${fileName}...`);

        const asset = await environment.createAssetFromFiles({
            fields: {
                title: { 'en-US': title },
                description: { 'en-US': description || title },
                file: {
                    'en-US': {
                        contentType: `image/${path.extname(filePath).slice(1) || 'webp'}`,
                        fileName: fileName,
                        file: fs.readFileSync(filePath),
                    },
                },
            },
        });

        await asset.processForAllLocales();

        // Wait for processing
        let processedAsset = await environment.getAsset(asset.sys.id);
        let retries = 0;
        while (!processedAsset.fields.file['en-US'].url && retries < 10) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            processedAsset = await environment.getAsset(asset.sys.id);
            retries++;
        }

        await processedAsset.publish();
        assetCache.set(filePath, processedAsset);
        return processedAsset;
    } catch (error) {
        console.error(`   ❌ Error subiendo asset ${title}:`, error);
        return null;
    }
}

/**
 * Upsert an entry in Contentful
 */
async function upsertEntry(
    environment: any,
    contentTypeId: string,
    queryField: string,
    queryValue: string,
    fields: any
): Promise<any> {
    try {
        const entries = await environment.getEntries({
            content_type: contentTypeId,
            [`fields.${queryField}`]: queryValue,
        });

        if (entries.items.length > 0) {
            console.log(`   🔸 Actualizando existente: ${contentTypeId} (${queryValue})...`);
            let entry = entries.items[0];

            // Handle archived entries
            if (entry.sys.archivedAt) {
                console.log(`   🔓 Desarchivando existente: ${contentTypeId} (${queryValue})...`);
                entry = await entry.unarchive();
            }

            entry.fields = { ...entry.fields, ...fields };
            entry = await entry.update();
            await entry.publish();
            return entry;
        } else {
            console.log(`   ✨ Creando nuevo: ${contentTypeId} (${queryValue})...`);
            const entry = await environment.createEntry(contentTypeId, { fields });
            await entry.publish();
            return entry;
        }
    } catch (error) {
        console.error(`❌ Error en upsert para ${contentTypeId} (${queryValue}):`, error);
        throw error;
    }
}

/**
 * Migrate Authors
 */
async function migrateAuthors(environment: any): Promise<Map<string, any>> {
    console.log('\n📝 Migrando autores con imágenes...\n');
    const authorMap = new Map<string, any>();

    for (const [key, author] of Object.entries(authors)) {
        try {
            const avatarPath = findAssetPath(`${key}-avatar.webp`);
            let avatarLink = null;
            if (avatarPath) {
                const asset = await uploadAsset(environment, `Avatar ${author.name}`, avatarPath);
                if (asset) {
                    avatarLink = {
                        'en-US': {
                            sys: { type: 'Link', linkType: 'Asset', id: asset.sys.id }
                        }
                    };
                }
            }

            const entry = await upsertEntry(environment, 'author', 'slug', key, {
                name: { 'en-US': author.name },
                slug: { 'en-US': key },
                role: { 'en-US': author.role },
                bio: { 'en-US': author.bio },
                avatar: avatarLink || undefined,
                linkedin: { 'en-US': author.social?.linkedin },
                twitter: { 'en-US': author.social?.twitter },
                instagram: { 'en-US': author.social?.instagram },
            });

            authorMap.set(key, entry);
            console.log(`✅ Author migrated: ${author.name}`);
        } catch (error) {
            console.error(`❌ Error migrating author ${author.name}:`, error);
        }
    }

    return authorMap;
}

/**
 * Migrate Blog Posts
 */
async function migrateBlogPosts(environment: any, authorMap: Map<string, any>): Promise<void> {
    console.log(`\n📰 Migrando posts de blog con imágenes...\n`);

    for (const post of blogPosts) {
        try {
            const authorKey = post.author.id === authors.juan.id ? 'juan' : 'camilo';
            const authorEntry = authorMap.get(authorKey);

            let imageLink = null;
            if (post.image && post.image.includes('unsplash.com')) {
                // For remote URLs, we could optionally download and upload, but let's keep it simple
                // or just skip for now as Contentful requires files for Assets usually.
            }

            await upsertEntry(environment, 'blogPost', 'slug', post.slug, {
                title: { 'en-US': post.title },
                slug: { 'en-US': post.slug },
                excerpt: { 'en-US': post.excerpt },
                content: {
                    'en-US': {
                        nodeType: 'document',
                        data: {},
                        content: [{
                            nodeType: 'paragraph',
                            data: {},
                            content: [{
                                nodeType: 'text',
                                value: post.content.replace(/<[^>]*>?/gm, ''),
                                marks: [], data: {}
                            }]
                        }]
                    }
                },
                publishDate: { 'en-US': post.publishDate },
                updatedDate: { 'en-US': post.updatedDate },
                category: { 'en-US': post.category },
                tags: { 'en-US': post.tags },
                author: {
                    'en-US': {
                        sys: { type: 'Link', linkType: 'Entry', id: authorEntry?.sys.id }
                    }
                },
            });
            console.log(`✅ Blog post migrated: ${post.title}`);
        } catch (error) {
            console.error(`❌ Error migrating blog post ${post.title}:`, error);
        }
    }
}

/**
 * Migrate Portfolio Cases
 */
async function migratePortfolioCases(environment: any): Promise<void> {
    console.log(`\n💼 Migrando casos de portfolio con galerías...\n`);

    for (const caseStudy of cases) {
        try {
            // Main image
            const mainImgPath = findAssetPath(`${caseStudy.id}.webp`) || findAssetPath(`${caseStudy.id}.png`);
            let mainImgLink = null;
            if (mainImgPath) {
                const asset = await uploadAsset(environment, `Featured ${caseStudy.title}`, mainImgPath);
                if (asset) {
                    mainImgLink = {
                        'en-US': {
                            sys: { type: 'Link', linkType: 'Asset', id: asset.sys.id }
                        }
                    };
                }
            }

            // Gallery
            const galleryLinks = [];
            for (let j = 1; j <= 3; j++) {
                const galleryPath = findAssetPath(`${caseStudy.id}-gallery-${j}.webp`);
                if (galleryPath) {
                    const asset = await uploadAsset(environment, `${caseStudy.title} Gallery ${j}`, galleryPath);
                    if (asset) {
                        galleryLinks.push({
                            sys: { type: 'Link', linkType: 'Asset', id: asset.sys.id }
                        });
                    }
                }
            }

            await upsertEntry(environment, 'portfolioCase', 'slug', caseStudy.slug, {
                title: { 'en-US': caseStudy.title },
                slug: { 'en-US': caseStudy.slug },
                description: { 'en-US': caseStudy.description },
                industry: { 'en-US': caseStudy.industry },
                year: { 'en-US': caseStudy.year },
                role: { 'en-US': caseStudy.role },
                context: { 'en-US': caseStudy.context },
                challenge: { 'en-US': caseStudy.challenge },
                solution: { 'en-US': caseStudy.solution },
                featuredImage: mainImgLink || undefined,
                gallery: galleryLinks.length > 0 ? { 'en-US': galleryLinks } : undefined,
                techStack: { 'en-US': caseStudy.techStack },
                tags: { 'en-US': caseStudy.tags },
                order: { 'en-US': caseStudy.order },
            });
            console.log(`✅ Portfolio case migrated: ${caseStudy.title}`);
        } catch (error) {
            console.error(`❌ Error migrating case ${caseStudy.title}:`, error);
        }
    }
}

/**
 * Migrate Hero Slides
 */
async function migrateHeroSlides(environment: any): Promise<void> {
    console.log('\n🎨 Migrando slides del hero con imágenes...\n');

    const heroImageNames = ['landing.webp', 'produccion.webp', 'logo.webp'];

    for (let i = 0; i < heroSlides.length; i++) {
        const slide = heroSlides[i];
        try {
            const imgPath = findAssetPath(heroImageNames[i]);
            let imgLink = null;
            if (imgPath) {
                const asset = await uploadAsset(environment, `Hero Slide ${i + 1}`, imgPath);
                if (asset) {
                    imgLink = {
                        'en-US': {
                            sys: { type: 'Link', linkType: 'Asset', id: asset.sys.id }
                        }
                    };
                }
            }

            await upsertEntry(environment, 'heroSlide', 'title', slide.title, {
                title: { 'en-US': slide.title },
                subtitle: { 'en-US': slide.subtitle },
                buttonText: { 'en-US': slide.buttonText },
                buttonLink: { 'en-US': slide.buttonLink },
                image: imgLink || undefined,
                imageAlt: { 'en-US': slide.imageAlt },
                order: { 'en-US': i + 1 },
                active: { 'en-US': true },
            });
            console.log(`✅ Hero slide ${i + 1} migrated`);
        } catch (error) {
            console.error(`❌ Error migrating slide ${i + 1}:`, error);
        }
    }
}

/**
 * Migrate Services
 */
async function migrateServices(environment: any): Promise<void> {
    console.log('\n🛠️ Migrando servicios...\n');

    for (const service of services) {
        try {
            await upsertEntry(environment, 'service', 'slug', service.slug, {
                title: { 'en-US': service.title },
                slug: { 'en-US': service.slug },
                excerpt: { 'en-US': service.description },
                description: {
                    'en-US': {
                        nodeType: 'document',
                        data: {},
                        content: [
                            {
                                nodeType: 'paragraph',
                                data: {},
                                content: [
                                    {
                                        nodeType: 'text',
                                        value: service.longDescription.replace(/<[^>]*>?/gm, ''), // Clean text
                                        marks: [],
                                        data: {},
                                    },
                                ],
                            },
                        ],
                    },
                },
                category: { 'en-US': service.category },
                tags: { 'en-US': service.tags },
                icon: { 'en-US': 'ph-duotone ph-check-circle' },
                price: { 'en-US': `${service.priceAmount} ${service.priceMeta || ''}`.trim() },
                duration: { 'en-US': service.priceMeta || '' },
                deliverables: { 'en-US': service.benefits },
                features: { 'en-US': service.features },
                featured: { 'en-US': service.badge === 'CORE' },
                order: { 'en-US': service.order },
            });

            console.log(`✅ Migrated service: ${service.title}`);
        } catch (error) {
            console.error(`❌ Error migrating service ${service.title}:`, error);
        }
    }
}

/**
 * Main migration function
 */
async function main() {
    console.log('🚀 Iniciando migración completa (Datos + Imágenes)...\n');

    try {
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment(ENVIRONMENT_ID);

        const authorMap = await migrateAuthors(environment);
        await migrateBlogPosts(environment, authorMap);
        await migratePortfolioCases(environment);
        await migrateHeroSlides(environment);
        await migrateServices(environment);

        console.log('\n✅ ¡Migración completa y sincronizada exitosamente!\n');
    } catch (error) {
        console.error('\n❌ Error fatal:', error);
        process.exit(1);
    }
}

main().catch(console.error);
