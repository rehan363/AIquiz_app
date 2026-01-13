'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { META_TAGS, APP_NAME, CREATOR_NAME } from '@/lib/constants';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = META_TAGS.description,
  keywords = META_TAGS.keywords,
  image = '/og-image.png',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = CREATOR_NAME,
  noIndex = false,
  canonical
}) => {
  const pathname = usePathname();
  const currentUrl = url || `https://quizzly.ai${pathname}`;
  const pageTitle = title ? `${title} | ${APP_NAME}` : META_TAGS.title;
  const canonicalUrl = canonical || currentUrl;

  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebSite',
    name: pageTitle,
    description,
    url: currentUrl,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: APP_NAME,
      logo: {
        '@type': 'ImageObject',
        url: 'https://quizzly.ai/logo.png'
      }
    },
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
    ...(type === 'website' && {
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://quizzly.ai/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    })
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="creator" content={CREATOR_NAME} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#4F46E5" />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${APP_NAME} - ${description}`} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@rehanahmed" />
      <meta name="twitter:site" content="@quizzlyai" />
      
      {/* Additional Meta Tags */}
      <meta name="application-name" content={APP_NAME} />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Additional structured data for educational content */}
      {type === 'website' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: APP_NAME,
              description: 'AI-powered quiz generation platform for personalized learning',
              url: 'https://quizzly.ai',
              founder: {
                '@type': 'Person',
                name: CREATOR_NAME,
                jobTitle: 'Agentic AI Developer'
              },
              serviceType: 'Educational Technology',
              areaServed: 'Worldwide',
              availableLanguage: 'English'
            })
          }}
        />
      )}
    </Head>
  );
};

export default SEO;