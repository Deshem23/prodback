import type { Schema, Struct } from '@strapi/strapi';

export interface ChantiersDocumentation extends Struct.ComponentSchema {
  collectionName: 'components_chantiers_documentations';
  info: {
    displayName: 'documentation';
    icon: 'arrowDown';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'chantiers.documentation': ChantiersDocumentation;
    }
  }
}
