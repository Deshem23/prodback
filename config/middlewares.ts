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
        
        if (!requestOrigin) {
          return null; // Block requests without origin (e.g., same-origin, curl, postman)
        }

        // Always allow your production frontend and local development
        const allowedOrigins = [
          'http://localhost:5173',
          'http://127.0.0.1:5173',
          'https://prodfront-one.vercel.app',
          'https://pretty-novelty-2b255ff22b.strapiapp.com',
        ];

        // Enhanced Vercel regex to match ALL Vercel deployment patterns
        const vercelRegex = /^https:\/\/[a-zA-Z0-9-]+(-[a-zA-Z0-9]+)*\.vercel\.app$/;

        // Also allow Vercel's main domain and common patterns
        const vercelPatterns = [
          'https://vercel.app',
          'https://*.vercel.app',
          'https://*.vercel.dev'
        ];

        // Check exact matches first
        if (allowedOrigins.includes(requestOrigin)) {
          return requestOrigin;
        }

        // Check Vercel preview deployments
        if (vercelRegex.test(requestOrigin)) {
          return requestOrigin;
        }

        // Check other Vercel patterns (optional safety net)
        if (vercelPatterns.some(pattern => {
          if (pattern.includes('*')) {
            const regexPattern = pattern.replace('*', '[a-zA-Z0-9-]+').replace('.', '\\.');
            return new RegExp(`^${regexPattern}$`).test(requestOrigin);
          }
          return pattern === requestOrigin;
        })) {
          return requestOrigin;
        }

        // Log blocked origins for debugging (optional)
        console.log('Blocked CORS origin:', requestOrigin);
        return null; // Block everything else
      },
      keepHeader: true,
      credentials: true, // Add this if you need cookies/auth
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];