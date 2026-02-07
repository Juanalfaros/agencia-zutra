/**
 * Contentful Cleanup Script
 * 
 * Identifies and removes duplicate entries and assets from Contentful.
 * Run with: npx tsx scripts/cleanup-contentful.ts
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

async function cleanupDuplicates() {
    console.log('🧹 Iniciando limpieza de duplicados en Contentful...\n');

    try {
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment(ENVIRONMENT_ID);

        // 1. Limpiar Entradas (Entries)
        const contentTypes = ['author', 'blogPost', 'portfolioCase', 'heroSlide', 'service'];
        for (const type of contentTypes) {
            await cleanupEntriesByType(environment, type);
        }

        // 2. Limpiar Assets
        await cleanupDuplicateAssets(environment);

        console.log('\n✅ Limpieza completada con éxito.');
    } catch (error) {
        console.error('\n❌ Error durante la limpieza:', error);
        process.exit(1);
    }
}

async function cleanupEntriesByType(environment: any, contentTypeId: string) {
    console.log(`📦 Procesando duplicados para: ${contentTypeId}...`);

    // Identificar campo de búsqueda (slug o title)
    const queryField = (contentTypeId === 'heroSlide') ? 'title' : 'slug';

    const entries = await environment.getEntries({
        content_type: contentTypeId,
        limit: 1000
    });

    const groups = new Map<string, any[]>();

    for (const entry of entries.items) {
        const value = entry.fields[queryField]?.['en-US'];
        if (!value) continue;

        if (!groups.has(value)) {
            groups.set(value, []);
        }
        groups.get(value)!.push(entry);
    }

    let deletedCount = 0;

    for (const [value, items] of groups.entries()) {
        if (items.length > 1) {
            console.log(`   ⚠️  Encontrados ${items.length} duplicados para ${queryField}: "${value}"`);

            // Regla para elegir cuál mantener:
            // 1. El que esté publicado
            // 2. El más reciente (updatedAt)

            const sorted = items.sort((a, b) => {
                const aPublished = !!a.sys.publishedAt ? 1 : 0;
                const bPublished = !!b.sys.publishedAt ? 1 : 0;
                if (aPublished !== bPublished) return bPublished - aPublished;
                return new Date(b.sys.updatedAt).getTime() - new Date(a.sys.updatedAt).getTime();
            });

            const keep = sorted[0];
            const toDelete = sorted.slice(1);

            for (const item of toDelete) {
                try {
                    console.log(`      🗑️ Eliminando duplicado ID: ${item.sys.id}...`);
                    if (item.sys.publishedAt) {
                        await item.unpublish();
                    }
                    await item.delete();
                    deletedCount++;
                } catch (e: any) {
                    console.error(`      ❌ No se pudo eliminar ${item.sys.id}: ${e.message}`);
                }
            }
        }
    }

    if (deletedCount > 0) {
        console.log(`   ✅ Se eliminaron ${deletedCount} entradas duplicadas.`);
    } else {
        console.log(`   ✨ No se encontraron duplicados.`);
    }
}

async function cleanupDuplicateAssets(environment: any) {
    console.log(`🖼️ Procesando duplicados para Assets...`);

    const assets = await environment.getAssets({
        limit: 1000
    });

    const groups = new Map<string, any[]>();

    for (const asset of assets.items) {
        const fileName = asset.fields.file?.['en-US']?.fileName || asset.fields.title?.['en-US'];
        if (!fileName) continue;

        if (!groups.has(fileName)) {
            groups.set(fileName, []);
        }
        groups.get(fileName)!.push(asset);
    }

    let deletedCount = 0;

    for (const [fileName, items] of groups.entries()) {
        if (items.length > 1) {
            console.log(`   ⚠️  Encontrados ${items.length} duplicados para asset: "${fileName}"`);

            const sorted = items.sort((a, b) => {
                const aPublished = !!a.sys.publishedAt ? 1 : 0;
                const bPublished = !!b.sys.publishedAt ? 1 : 0;
                if (aPublished !== bPublished) return bPublished - aPublished;
                return new Date(b.sys.updatedAt).getTime() - new Date(a.sys.updatedAt).getTime();
            });

            const toDelete = sorted.slice(1);

            for (const item of toDelete) {
                try {
                    console.log(`      🗑️ Eliminando asset duplicado ID: ${item.sys.id}...`);
                    if (item.sys.publishedAt) {
                        await item.unpublish();
                    }
                    // Nota: Si el asset está siendo usado por una entrada activa, 
                    // Contentful arrojará un error 400. Esto es deseado para no romper links.
                    await item.delete();
                    deletedCount++;
                } catch (e: any) {
                    // Si falla por estar siendo usado, simplemente fallamos silenciosamente o informamos
                    // En muchos casos es mejor no borrar si hay duda
                    // console.warn(`      ⚠️  No se borró: puede estar en uso.`);
                }
            }
        }
    }

    console.log(`   ✅ Se eliminaron ${deletedCount} assets duplicados.`);
}

cleanupDuplicates().catch(console.error);
