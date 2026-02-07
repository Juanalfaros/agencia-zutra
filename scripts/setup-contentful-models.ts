/**
 * Contentful Model Setup Script
 * 
 * Automates the creation of content models in Contentful based on the implementation plan.
 * Run with: npx tsx scripts/setup-contentful-models.ts
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

async function setupModels() {
    console.log('🚀 Iniciando configuración de Content Models en Contentful...\n');

    try {
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment(ENVIRONMENT_ID);

        // 1. AUTHOR Model
        await createContentType(environment, 'author', 'Author', [
            { id: 'name', name: 'Nombre completo', type: 'Symbol', required: true },
            { id: 'slug', name: 'URL Slug', type: 'Symbol', required: true },
            { id: 'role', name: 'Cargo/Rol', type: 'Symbol', required: true },
            { id: 'avatar', name: 'Foto de perfil', type: 'Link', linkType: 'Asset', required: false },
            { id: 'bio', name: 'Biografía', type: 'Text', required: true },
            { id: 'linkedin', name: 'LinkedIn URL', type: 'Symbol', required: false },
            { id: 'twitter', name: 'Twitter URL', type: 'Symbol', required: false },
            { id: 'instagram', name: 'Instagram URL', type: 'Symbol', required: false },
        ], 'name');

        // 2. BLOG POST Model
        await createContentType(environment, 'blogPost', 'Blog Post', [
            { id: 'title', name: 'Título', type: 'Symbol', required: true },
            { id: 'slug', name: 'URL Slug', type: 'Symbol', required: true },
            { id: 'excerpt', name: 'Resumen', type: 'Text', required: true },
            { id: 'content', name: 'Contenido', type: 'RichText', required: true },
            { id: 'publishDate', name: 'Fecha de publicación', type: 'Date', required: true },
            { id: 'updatedDate', name: 'Última actualización', type: 'Date', required: false },
            { id: 'featuredImage', name: 'Imagen destacada', type: 'Link', linkType: 'Asset', required: false },
            { id: 'author', name: 'Autor', type: 'Link', linkType: 'Entry', required: true, validations: [{ linkContentType: ['author'] }] },
            { id: 'category', name: 'Categoría', type: 'Symbol', required: true },
            { id: 'tags', name: 'Etiquetas', type: 'Array', items: { type: 'Symbol' }, required: false },
            { id: 'featured', name: 'Post destacado', type: 'Boolean', required: false, defaultValue: { 'en-US': false } },
            { id: 'seoTitle', name: 'SEO Title Override', type: 'Symbol', required: false },
            { id: 'seoDescription', name: 'SEO Description', type: 'Text', required: false },
            { id: 'seoKeywords', name: 'SEO Keywords', type: 'Array', items: { type: 'Symbol' }, required: false },
            { id: 'ctaId', name: 'CTA ID', type: 'Symbol', required: false },
        ], 'title');

        // 3. PORTFOLIO CASE Model
        await createContentType(environment, 'portfolioCase', 'Portfolio Case', [
            { id: 'title', name: 'Nombre del proyecto', type: 'Symbol', required: true },
            { id: 'slug', name: 'URL Slug', type: 'Symbol', required: true },
            { id: 'subtitle', name: 'Subtítulo', type: 'Symbol', required: false },
            { id: 'tagline', name: 'Tagline corto', type: 'Symbol', required: false },
            { id: 'description', name: 'Descripción breve', type: 'Text', required: true },
            { id: 'industry', name: 'Industria', type: 'Symbol', required: true },
            { id: 'year', name: 'Año', type: 'Symbol', required: true },
            { id: 'projectType', name: 'Tipo de proyecto', type: 'Symbol', required: false },
            { id: 'featuredImage', name: 'Imagen principal', type: 'Link', linkType: 'Asset', required: false },
            { id: 'featuredImageCaption', name: 'Caption de imagen', type: 'Symbol', required: false },
            { id: 'role', name: 'Rol en el proyecto', type: 'Symbol', required: true },
            { id: 'duration', name: 'Duración', type: 'Symbol', required: false },
            { id: 'context', name: 'Contexto', type: 'Symbol', required: true },
            { id: 'websiteUrl', name: 'URL del sitio', type: 'Symbol', required: false },
            { id: 'challenge', name: 'El desafío', type: 'Text', required: true },
            { id: 'problemStatement', name: 'Problem Statement', type: 'Text', required: false },
            { id: 'challenges', name: 'Puntos críticos', type: 'Array', items: { type: 'Symbol' }, required: false },
            { id: 'approach', name: 'Enfoque', type: 'Text', required: false },
            { id: 'solution', name: 'La solución', type: 'Text', required: true },
            { id: 'designPhilosophy', name: 'Filosofía de diseño', type: 'Text', required: false },
            { id: 'techStack', name: 'Stack tecnológico', type: 'Array', items: { type: 'Symbol' }, required: true },
            { id: 'team', name: 'Equipo (JSON)', type: 'Object', required: false },
            { id: 'process', name: 'Proceso (JSON)', type: 'Object', required: false },
            { id: 'userPersonas', name: 'User Personas (JSON)', type: 'Object', required: false },
            { id: 'metrics', name: 'Métricas (JSON)', type: 'Object', required: false },
            { id: 'keyFeatures', name: 'Features Principales (JSON)', type: 'Object', required: false },
            { id: 'gallery', name: 'Galería de imágenes', type: 'Array', items: { type: 'Link', linkType: 'Asset' }, required: false },
            { id: 'testimonial', name: 'Testimonial (JSON)', type: 'Object', required: false },
            { id: 'lessonsLearned', name: 'Lecciones aprendidas', type: 'Array', items: { type: 'Symbol' }, required: false },
            { id: 'futureEnhancements', name: 'Mejoras futuras', type: 'Array', items: { type: 'Symbol' }, required: false },
            { id: 'awards', name: 'Premios (JSON)', type: 'Object', required: false },
            { id: 'press', name: 'Prensa (JSON)', type: 'Object', required: false },
            { id: 'tags', name: 'Tags', type: 'Array', items: { type: 'Symbol' }, required: true },
            { id: 'featured', name: 'Caso destacado', type: 'Boolean', required: false, defaultValue: { 'en-US': false } },
            { id: 'order', name: 'Orden', type: 'Integer', required: false },
        ], 'title');

        // 4. SERVICE Model
        await createContentType(environment, 'service', 'Service', [
            { id: 'title', name: 'Nombre del servicio', type: 'Symbol', required: true },
            { id: 'slug', name: 'URL Slug', type: 'Symbol', required: true },
            { id: 'excerpt', name: 'Descripción corta', type: 'Text', required: true },
            { id: 'description', name: 'Descripción completa (Rich Text)', type: 'RichText', required: true },
            { id: 'category', name: 'Categoría', type: 'Symbol', required: true },
            { id: 'tags', name: 'Tags', type: 'Array', items: { type: 'Symbol' }, required: false },
            { id: 'icon', name: 'Nombre del icono', type: 'Symbol', required: false },
            { id: 'featuredImage', name: 'Imagen destacada', type: 'Link', linkType: 'Asset', required: false },
            { id: 'price', name: 'Precio / Monto', type: 'Symbol', required: false },
            { id: 'duration', name: 'Duración/Periodicidad', type: 'Symbol', required: false },
            { id: 'deliverables', name: 'Entregables / Beneficios', type: 'Array', items: { type: 'Symbol' }, required: false },
            { id: 'features', name: 'Features del servicio (JSON)', type: 'Object', required: false },
            { id: 'featured', name: 'Servicio destacado', type: 'Boolean', required: false, defaultValue: { 'en-US': false } },
            { id: 'order', name: 'Orden', type: 'Integer', required: false },
        ], 'title');

        // 5. HERO SLIDE Model
        await createContentType(environment, 'heroSlide', 'Hero Slide', [
            { id: 'title', name: 'Título (soporta HTML)', type: 'Symbol', required: true },
            { id: 'subtitle', name: 'Subtítulo', type: 'Text', required: true },
            { id: 'buttonText', name: 'Texto del botón', type: 'Symbol', required: true },
            { id: 'buttonLink', name: 'Link del botón', type: 'Symbol', required: true },
            { id: 'image', name: 'Imagen del slide', type: 'Link', linkType: 'Asset', required: false },
            { id: 'imageAlt', name: 'Alt text de imagen', type: 'Symbol', required: true },
            { id: 'order', name: 'Orden', type: 'Integer', required: true },
            { id: 'active', name: 'Slide activo', type: 'Boolean', required: false, defaultValue: { 'en-US': true } },
        ], 'title');

        console.log('\n✅ ¡Todos los Content Models han sido configurados correctamente!\n');
    } catch (error) {
        console.error('\n❌ Error durante la configuración:', error);
        process.exit(1);
    }
}

async function createContentType(environment: any, id: string, name: string, fields: any[], displayField: string) {
    try {
        console.log(`📦 Configurando Content Type: ${name} (${id})...`);

        let contentType;
        try {
            contentType = await environment.getContentType(id);
            console.log(`   🔸 Ya existe. Actualizando...`);
        } catch (e) {
            console.log(`   🔹 No existe. Creando...`);
            contentType = await environment.createContentTypeWithId(id, {
                name,
                fields: []
            });
        }

        // Merge fields: Keep new ones, and mark old ones not in our list as omitted
        const existingFields = contentType.fields || [];
        const newFieldIds = new Set(fields.map(f => f.id));

        // Start with the fields we want
        const finalFields = fields.map(field => ({
            id: field.id,
            name: field.name,
            type: field.type,
            required: field.required || false,
            localized: false,
            disabled: false,
            omitted: false,
            ...(field.linkType ? { linkType: field.linkType } : {}),
            ...(field.items ? { items: field.items } : {}),
            ...(field.validations ? { validations: field.validations } : {}),
            ...(field.defaultValue ? { defaultValue: field.defaultValue } : {}),
        }));

        // Add back existing fields that are NOT in our new list, but mark them as omitted
        existingFields.forEach((ef: any) => {
            if (!newFieldIds.has(ef.id)) {
                console.log(`   ⚠️  Omitiendo campo antiguo: ${ef.name} (${ef.id})`);
                finalFields.push({
                    ...ef,
                    omitted: true,
                    disabled: true,
                    required: false // MUST BE FALSE TO AVOID VALIDATION ERRORS ON PUBLISH
                });
            }
        });

        contentType.fields = finalFields;
        contentType = await contentType.update();

        // Second step: Set displayField now that fields exist
        contentType.displayField = displayField;
        contentType = await contentType.update();

        await contentType.publish();
        console.log(`   ✅ Publicado exitosamente.`);
    } catch (error) {
        console.error(`   ❌ Error con Content Type ${id}:`, error);
        throw error;
    }
}

setupModels().catch(console.error);
