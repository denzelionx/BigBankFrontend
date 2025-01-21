import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

export class FileService {
  /**
   * Locates the project root directory by finding the parent directory that contains
   * both 'frontend' and 'backend' directories.
   * 
   * @param {string} startDir - Starting directory to search from
   * @returns {Promise<string>} The path to the project root
   */
  async findProjectRoot(startDir) {
    let currentDir = startDir;
    
    while (currentDir !== path.parse(currentDir).root) {
      const parentDir = path.dirname(currentDir);
      const frontendPath = path.join(parentDir, 'frontend');
      const backendPath = path.join(parentDir, 'backend');
      
      try {
        const [frontendStats, backendStats] = await Promise.all([
          fs.promises.stat(frontendPath),
          fs.promises.stat(backendPath)
        ]);
        
        if (frontendStats.isDirectory() && backendStats.isDirectory()) {
          return parentDir;
        }
      } catch {
        // Continue searching if paths don't exist or can't be accessed
      }
      
      currentDir = parentDir;
    }
    
    return path.dirname(path.dirname(fileURLToPath(import.meta.url)));
  }

  /**
   * Gets all Vue component files recursively from the specified directory
   * 
   * @param {string} sourceDir - Source directory to search
   * @returns {Promise<string[]>} Array of absolute file paths
   */
  async getVueFiles(sourceDir) {
    return glob(path.join(sourceDir, '**/*.vue'));
  }

  /**
   * Gets all JavaScript files recursively from the specified directory
   * 
   * @param {string} sourceDir - Source directory to search
   * @returns {Promise<string[]>} Array of absolute file paths
   */
  async getJavaScriptFiles(sourceDir) {
    return glob(path.join(sourceDir, '**/*.js'));
  }

  /**
   * Writes content to a file
   * 
   * @param {string} filePath - Path where to write the file
   * @param {string} content - Content to write
   * @returns {Promise<void>}
   */
  async writeFile(filePath, content) {
    await fs.promises.writeFile(filePath, content);
  }
}
