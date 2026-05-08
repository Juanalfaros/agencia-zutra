import { groq } from './sanity';

export const AUTHOR_FIELDS = groq`
  _id,
  name,
  role,
  bio,
  "slug": slug.current,
  "avatar": avatar.asset->url,
  linkedin,
  instagram
`;

export const ANALYST_FIELDS = groq`
  name,
  role,
  "avatar": avatar.asset->url
`;

export const AUDIT_REPORT_FIELDS = groq`
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  client,
  description,
  date,
  category,
  protected,
  accessExpiry,
  presentationEnabled,
  "headerImage": headerImage.asset->url,
  "analystRef": analystRef-> { ${ANALYST_FIELDS} },
  executiveSummary,
  conclusion,
  reportContent[] {
    ...,
    _type == "image" => { ..., "asset": asset->url },
    _type == "blockSplit" => {
      ...,
      "image": image.asset->url
    },
    _type == "optionsGridBlock" => {
      ...,
      options[] { ... }
    }
  },
  slides[]-> {
    _id,
    title,
    type,
    priority,
    highlight,
    content,
    bullets,
    "image": image.asset->url,
    "imageAlt": title,
    ctaText,
    ctaLink,
    order,
    options[]-> {
      _id,
      variant,
      title,
      description,
      recommended,
      pros,
      cons,
      price,
      ctaText,
      ctaLink
    }
  }
`;

export const POST_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "featuredImage": featuredImage.asset->url,
  "date": coalesce(publishDate, _createdAt),
  author->{ ${AUTHOR_FIELDS} },
  category,
  tags,
  content
`;

export const SERVICE_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  badge,
  "featuredImage": featuredImage.asset->url,
  category,
  categoryRef,
  excerpt,
  description,
  longDescription,
  details,
  features,
  benefits,
  deliverables,
  result,
  featured,
  priceAmount,
  priceMeta,
  price,
  duration,
  icon,
  tags,
  order
`;

export const CASE_STUDY_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  subtitle,
  tagline,
  description,
  "featuredImage": featuredImage.asset->url,
  "gallery": gallery[] { "src": asset->url, alt },
  client,
  date,
  industry,
  year,
  projectType,
  role,
  context,
  websiteUrl,
  techStack,
  challenge,
  solution,
  challenges,
  process,
  keyFeatures,
  tags,
  featured,
  order
`;

export const HERO_SLIDE_FIELDS = groq`
  _id,
  title,
  subtitle,
  "image": image.asset->url,
  "imageAlt": imageAlt,
  buttonText,
  buttonLink,
  active,
  order
`;

export const TESTIMONIAL_FIELDS = groq`
  _id,
  author,
  role,
  company,
  quote,
  "avatar": avatar.asset->url,
  featured,
  order
`;

export const CATEGORY_FIELDS = groq`
  _id,
  "title": coalesce(title, name),
  "slug": slug.current,
  order
`;

export const RECURSO_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  description,
  longDescription,
  "featuredImage": featuredImage.asset->url,
  "gallery": gallery[] { "src": asset->url, alt },
  isFree,
  price,
  gumroadUrl,
  status,
  category,
  tags,
  techStack,
  features,
  demoUrl,
  featured,
  order
`;
