import path from 'path';

export class DocsFormatter {
  /**
   * Creates initial document structure
   * 
   * @returns {string[]} Array of document lines
   */
  createInitialDocument() {
    return [
      '= Frontend Documentation',
      ':doctype: book',
      ':toc: left',
      ':toclevels: 3',
      ':sectnums:',
      ':experimental:',
      '',
      '== Introduction',
      '',
      'This document provides documentation for the Vue.js frontend application.',
      '',
      this.createApplicationStructure()
    ];
  }

  /**
   * Creates application structure section
   * 
   * @returns {string} Application structure content
   */
  createApplicationStructure() {
    return [
      '== Application Structure',
      '',
      '[horizontal]',
      'Components:: Vue components that make up the UI',
      'Logic:: Common functionality and calculations',
      'API:: API and external service integrations',
      ''
    ].join('\n');
  }

  /**
   * Formats Vue component documentation
   * 
   * @param {Object} componentInfo - Parsed component information
   * @param {string} filePath - Path to the component file
   * @returns {string[]} Array of documentation lines
   */
  formatComponentDocs(componentInfo, filePath) {
    // Create relative path for component name
    const relativePath = path.relative(process.cwd(), filePath);
    const docs = [`=== ${relativePath}`, ''];

    if (componentInfo.description) {
      docs.push(componentInfo.description, '');
    }

    docs.push(
      ...this.formatComponentProps(componentInfo.props),
      ...this.formatComponentMethods(componentInfo.methods),
      ...this.formatComponentEvents(componentInfo.events)
    );

    return docs;
  }

  /**
   * Formats component props
   * 
   * @param {Array} props - Component props
   * @returns {string[]} Formatted props documentation
   */
  formatComponentProps(props) {
    if (!props?.length) return [];

    return [
      '.Props',
      '[%header,cols="2,1,2"]',
      '|===',
      '|Name|Type|Description',
      ...props.map(prop =>
        `|${prop.name}|${prop.type?.name || 'any'}|${prop.description || ''}`
      ),
      '|===',
      ''
    ];
  }

  /**
   * Formats component methods
   * 
   * @param {Array} methods - Component methods
   * @returns {string[]} Formatted methods documentation
   */
  formatComponentMethods(methods) {
    if (!methods?.length) return [];

    return [
      '.Methods',
      '[%collapsible]',
      '====',
      ...methods.map(method =>
        `* \`${method.name}(${this.formatParams(method.params)})\`${method.description ? ': ' + method.description : ''}`
      ),
      '====',
      ''
    ];
  }

  /**
   * Formats component events
   * 
   * @param {Array} events - Component events
   * @returns {string[]} Formatted events documentation
   */
  formatComponentEvents(events) {
    if (!events?.length) return [];

    return [
      '.Events',
      '[%collapsible]',
      '====',
      ...events.map(event =>
        `* \`${event.name}\`${event.description ? ': ' + event.description : ''}`
      ),
      '====',
      ''
    ];
  }

  /**
   * Formats JavaScript documentation
   * 
   * @param {Array} jsdocData - Parsed JSDoc data
   * @param {string} filePath - Path to the JavaScript file
   * @returns {string[]} Formatted documentation lines
   */
  formatJavaScriptDocs(jsdocData, filePath) {
    const relativePath = path.relative(process.cwd(), filePath);
    const docs = [`=== ${relativePath}`, ''];

    jsdocData
      .filter(item => !item.undocumented)
      .forEach(item => {
        docs.push(...this.formatJSDocItem(item));
      });

    return docs;
  }

  /**
   * Formats a single JSDoc item
   * 
   * @param {Object} item - JSDoc item
   * @returns {string[]} Formatted documentation lines
   */
  formatJSDocItem(item) {
    const docs = [];

    switch (item.kind) {
      case 'function':
        docs.push(
          `==== ${item.name}`,
          '',
          item.description || '',
          ''
        );
        if (item.params?.length) {
          docs.push(
            '.Parameters',
            '[%header,cols="2,1,2"]',
            '|===',
            '|Name|Type|Description',
            ...item.params.map(param =>
              `|${param.name}|${param.type?.names?.join('|') || 'any'}|${param.description || ''}`
            ),
            '|===',
            ''
          );
        }
        break;

      case 'class':
      case 'constant':
        docs.push(
          `==== ${item.kind}: ${item.name}`,
          '',
          item.description || '',
          ''
        );
        break;
    }

    return docs;
  }

  /**
   * Formats method parameters
   * 
   * @param {Array} params - Parameter objects
   * @returns {string} Formatted parameter string
   */
  formatParams(params = []) {
    return params.map(param => param.name).join(', ');
  }

  /**
   * Converts documentation array to AsciiDoc string
   * 
   * @param {string[]} content - Documentation lines
   * @returns {string} Complete AsciiDoc content
   */
  generateAsciidoc(content) {
    return content.join('\n');
  }
}