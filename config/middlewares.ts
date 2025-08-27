export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'https://prodfront-one.vercel.app', 
        'https://prodfront-git-main-shillers-projects-af08f62e.vercel.app',
        'https://pretty-novelty-2b255ff22b.strapiapp.com', 
      ],
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