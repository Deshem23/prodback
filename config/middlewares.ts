export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: (ctx) => {
        const requestOrigin = ctx.request.header.origin;

        // Always allow your production frontend
        const allowedOrigins = [
          'https://prodfront-one.vercel.app',
          'https://pretty-novelty-2b255ff22b.strapiapp.com',
        ];

        // Allow all vercel.app preview URLs dynamically
        const vercelRegex = /^https:\/\/[a-z0-9-]+\.vercel\.app$/;

        if (
          allowedOrigins.includes(requestOrigin) ||
          vercelRegex.test(requestOrigin)
        ) {
          return requestOrigin;
        }

        return null; // Block everything else
      },
      keepHeader: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];