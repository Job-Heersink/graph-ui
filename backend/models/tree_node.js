export class TreeNode {
  constructor(node) {
    this.name = node.name;
    this.description = node.description;
    this.parent = typeof node.parent !== 'undefined' ? node.parent : null;
  }
}