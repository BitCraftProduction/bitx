import { Node } from './ast';
import { RuntimeComponents } from './runtime';

export class Compiler {
  compile(nodes: Node[]): string {
    // There should be one root node usually, but we handle list just in case
    return nodes.map(n => this.compileNode(n)).join('\n');
  }

  private compileNode(node: Node): string {
    const generator = RuntimeComponents[node.type];
    
    if (!generator) {
      console.warn(`Warning: Unknown component '${node.type}'`);
      return `<!-- Unknown component: ${node.type} -->`;
    }

    const childrenHtml = (node.children || []).map(c => this.compileNode(c)).join('\n');
    return generator(node.args || [], childrenHtml);
  }
}
