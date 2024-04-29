export class TreeNode {
  constructor(node) {
    this.id = node.name;
    this.description = node.description;
    if(typeof node.parent !== 'undefined'){
      this.parentId = node.parent
    }
  }
}