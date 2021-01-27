import React from 'react';
import { Helmet } from 'react-helmet';

export function SEO({ children, pageDescription, pageTitle, pageUrl, image }) {


  return (
    <React.Fragment>
      <Helmet
        defaultTitle={'My App'}
        htmlAttributes={{ lang: 'en' }}
        titleTemplate={`%s | ${'My App'}`}
      >
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:description"
          content={pageDescription}
        />
        <meta
          property="og:title"
          content={`${pageTitle}}`}
        />
        {image && <meta property="og:image" content={image} />}

        <meta
          property="twitter:title"
          content={`${pageTitle}}`}
        />
        <meta
          property="twitter:card"
          content={image ? 'summary_large_media' : 'summary'}
        />
        {image && <meta property="twitter:image" content={image} />}
      </Helmet>
      {children}
    </React.Fragment>
  )
}
