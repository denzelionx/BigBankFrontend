import { fileURLToPath } from 'url';
import path from 'path';
import { parse } from 'vue-docgen-api';
import * as jsdoc from 'jsdoc-api';
import { FileService } from './fileService.js';
import { DocsFormatter } from './docsFormatter.js';

export class DocsGenerator {
  /**
   * Creates a new documentation generator instance
   * 
   * @param {string} sourceDir - Source directory containing Vue and JS files
   */
  constructor(sourceDir = 'src') {
    this.sourceDir = sourceDir;
    this.fileService = new FileService();
    this.formatter = new DocsFormatter();
  }

  /**
   * Generates documentation and writes it to a file
   */
  async generateDocs() {
    const content = this.formatter.createInitialDocument();
    
    const [componentDocs, jsDocs] = await Promise.all([
      this.processComponents(),
      this.processJavaScript()
    ]);

    content.push(...componentDocs, ...jsDocs);
    const asciidoc = this.formatter.generateAsciidoc(content);
    
    const projectRoot = await this.fileService.findProjectRoot(
      path.dirname(fileURLToPath(import.meta.url))
    );
    
    await this.fileService.writeFile(
      path.join(projectRoot, 'frontend.adoc'), 
      asciidoc
    );

    console.log('Documentation generated successfully!');
  }

  /**
   * Processes all Vue components
   * 
   * @returns {Promise<string[]>} Documentation lines for components
   */
  async processComponents() {
    const docs = ['== Components', ''];
    const vueFiles = await this.fileService.getVueFiles(this.sourceDir);

    for (const file of vueFiles) {
      try {
        const componentInfo = await parse(file);
        const componentDocs = this.formatter.formatComponentDocs(componentInfo, file);
        docs.push(...componentDocs);
      } catch (error) {
        console.warn(`Warning: Could not parse ${file}:`, error.message);
      }
    }

    return docs;
  }

  /**
   * Processes all JavaScript files
   * 
   * @returns {Promise<string[]>} Documentation lines for JavaScript files
   */
  async processJavaScript() {
    const docs = ['== JavaScript Modules', ''];
    const jsFiles = await this.fileService.getJavaScriptFiles(this.sourceDir);

    for (const file of jsFiles) {
      try {
        const jsdocData = jsdoc.explainSync({ files: file });
        const moduleDocs = this.formatter.formatJavaScriptDocs(jsdocData, file);
        docs.push(...moduleDocs);
      } catch (error) {
        console.warn(`Warning: Could not parse ${file}:`, error.message);
      }
    }

    return docs;
  }
}