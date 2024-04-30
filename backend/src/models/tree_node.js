export class TreeNode {
  /*
  Represents a single node in the tree.
  Root nodes will have an undefined parentId.
   */

  constructor(node) {
    this.id = node.name;
    this.description = node.description;
    if(typeof node.parent !== 'undefined'){
      this.parentId = node.parent;
    }
  }
}