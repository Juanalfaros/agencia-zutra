# Contentful CMS Integration

## Installation

Install the required dependencies with pnpm:

```bash
pnpm add contentful @contentful/rich-text-html-renderer
pnpm add -D contentful-management dotenv tsx
```

## Configuration

1. **Create `.env` file** in the project root with your Contentful credentials:

```env
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token_here
CONTENTFUL_PREVIEW_TOKEN=your_preview_api_token_here
CONTENTFUL_ENVIRONMENT=master
```

2. **Get your Contentful credentials**:
   - Go to [Contentful](https://app.contentful.com)
   - Navigate to Settings → API keys
   - Create a new API key or use an existing one
   - Copy the Space ID and Content Delivery API access token

## Content Models

You need to create the following content models in Contentful. See `implementation_plan.md` for detailed field specifications.

### Required Content Models:

1. **Author** (`author`)
2. **Blog Post** (`blogPost`)
3. **Portfolio Case** (`portfolioCase`)
4. **Service** (`service`)
5. **Hero Slide** (`heroSlide`)

## Usage

### Fetching Blog Posts

```typescript
import { getEntries } from '@/lib/contentful';
import { adaptBlogPost } from '@/lib/contentful-adapters';

const entries = await getEntries('blogPost', {
  order: '-fields.publishDate',
  limit: 10,
});

const posts = entries.items.map(adaptBlogPost);
```

### Fetching Portfolio Cases

```typescript
import { getEntries } from '@/lib/contentful';
import { adaptPortfolioCase } from '@/lib/contentful-adapters';

const entries = await getEntries('portfolioCase', {
  order: 'fields.order',
  'fields.featured': true,
});

const cases = entries.items.map(adaptPortfolioCase);
```

### Fetching Hero Slides

```typescript
import { getEntries } from '@/lib/contentful';
import { adaptHeroSlide } from '@/lib/contentful-adapters';

const entries = await getEntries('heroSlide', {
  order: 'fields.order',
  'fields.active': true,
});

const slides = entries.items.map(adaptHeroSlide);
```

## Next Steps

1. Install dependencies (see above)
2. Configure environment variables
3. Create content models in Contentful
4. Migrate sample content
5. Update page files to use Contentful data
6. Test and verify

## Files Created

- `src/lib/contentful.ts` - Contentful client with caching
- `src/lib/contentful-adapters.ts` - Type adapters for all content types
- `.env.example` - Environment variables template

## Support

For detailed implementation steps, see `implementation_plan.md` in the brain artifacts directory.
