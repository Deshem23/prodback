export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: (ctx) => {
        const requestOrigin = ctx.request.header.origin;
        
        if (!requestOrigin) {
          return '*';
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

        // If origin is not allowed, return the first allowed origin instead of null
        // to prevent a complete failure in some scenarios.
        return allowedOrigins[0];
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];