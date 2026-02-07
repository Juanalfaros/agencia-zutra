/**
 * Contentful Delete Content Type Script
 * 
 * Safely removes a specific content type and all its entries.
 * Run with: npx tsx scripts/delete-content-type.ts
 */

import contentfulManagement from 'contentful-management';
const { createClient } = contentfulManagement;
import * as dotenv from 'dotenv';
dotenv.config();

const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';

async function deleteContentType(targetName: string) {
    console.log(`🔎 Buscando content type: "${targetName}"...\n`);

    try {
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment(ENVIRONMENT_ID);

        const contentTypes = await environment.getContentTypes();
        const target = contentTypes.items.find(ct => ct.name.toLowerCase() === targetName.toLowerCase());

        if (!target) {
            console.log(`❌ No se encontró ningún content type con el nombre "${targetName}".`);
            console.log('Content types disponibles:');
            contentTypes.items.forEach(ct => console.log(` - ${ct.name} (${ct.sys.id})`));
            return;
        }

        const ctId = target.sys.id;
        console.log(`🎯 Encontrado: ${target.name} (${ctId})`);

        // 1. Borrar todas sus entradas
        const entries = await environment.getEntries({ content_type: ctId });
        console.log(`📦 Borrando ${entries.items.length} entradas...`);
        for (const entry of entries.items) {
            if (entry.sys.publishedAt) await entry.unpublish();
            await entry.delete();
        }

        // 2. Despublicar Content Type
        console.log(`📄 Despublicando content type...`);
        await target.unpublish();

        // 3. Borrar Content Type
        console.log(`🗑️ Borrando content type...`);
        await target.delete();

        console.log(`\n✅ "${targetName}" ha sido eliminado exitosamente.`);
    } catch (error) {
        console.error('\n❌ Error durante la eliminación:', error);
    }
}

deleteContentType('blog zutra').catch(console.error);
