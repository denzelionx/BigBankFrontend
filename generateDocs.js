import { DocsGenerator } from './src/logic/docsGenerator.js';

const generator = new DocsGenerator();
generator.generateDocs()
  .then(() => console.log('Documentation generation complete!'))
  .catch(console.error);