import { Helmet } from 'react-helmet-async';
import { SITE_DOMAIN, SUBJECT_NAME, SUBJECT_TITLE, SUBJECT_NICKNAME, COMPANY_NAME, UNIVERSITY, SAME_AS_LINKS, IMAGES } from '@/lib/siteConfig';

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
  schemas?: object[];
}

export default function SEO({ title, description, canonical, ogType = 'website', ogImage, schemas = [] }: SEOProps) {
  const fullCanonical = canonical.startsWith('http') ? canonical : `${SITE_DOMAIN}${canonical}`;
  const fullOgImage = ogImage
    ? ogImage.startsWith('http') ? ogImage : `${SITE_DOMAIN}${ogImage}`
    : `${SITE_DOMAIN}${IMAGES.heroGrant}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SUBJECT_NAME,
    alternateName: SUBJECT_NICKNAME,
    jobTitle: 'CEO of JFJ Holdings',
    worksFor: { '@type': 'Organization', name: COMPANY_NAME },
    url: 'https://www.jakefrugejr.com',
    image: `${SITE_DOMAIN}${IMAGES.jakeForbesSuit}`,
    description: SUBJECT_TITLE,
    alumniOf: { '@type': 'CollegeOrUniversity', name: UNIVERSITY },
    knowsAbout: ['Entrepreneurship', 'Business Strategy', 'Financial Services', 'Leadership Development', 'Team Building'],
    sameAs: SAME_AS_LINKS,
  };

  const allSchemas = [personSchema, ...schemas];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="Jake Fruge Jr Grant" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {allSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
