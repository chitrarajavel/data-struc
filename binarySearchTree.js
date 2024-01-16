class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        var newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        var current = this.root;
        while (true) {
            if (value === current.value) return undefined;
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    find(value) {
        if (this.root === null) return false;
        var current = this.root,
            found = false;
        while (current && !found) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                found = true;
            }
        }
        if (!found) return undefined;
        return current;
    }

    contains(value) {
        if (this.root === null) return false;
        var current = this.root,
            found = false;
        while (current && !found) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                return true;
            }
        }
        return false;
    }
    BFS() {
        let node = this.root;
        let data = [];
        let queue = [];
        queue.push(node);

        while (queue.length) {
            node = queue.shift();
            data.push(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return data;
    }
    DFSPreOrder() {
        var data = [];
        function traverse(node) {
            data.push(node.value);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return data;
    }
    DFSPostOrder() {
        var data = [];
        function traverse(node) {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            data.push(node.value);
        }
        traverse(this.root);
        return data;
    }
    DFSInOrder() {
        var data = [];
        function traverse(node) {
            if (node.left) traverse(node.left);
            data.push(node.value);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return data;
    }
    /** minDepth(): return the minimum depth of the tree -- that is,
     * the length of the shortest path from the root to a leaf. */

    minDepth() {
        if (!this.root) return 0;

        function minDepthHelper(node) {
            if (node.left === null && node.right === null) return 1;
            if (node.left === null) return minDepthHelper(node.right) + 1;
            if (node.right === null) return minDepthHelper(node.left) + 1;
            return (
                Math.min(
                    minDepthHelper(node.left),
                    minDepthHelper(node.right)
                ) + 1
            );
        }

        return minDepthHelper(this.root);
    }

    /** maxDepth(): return the maximum depth of the tree -- that is,
     * the length of the longest path from the root to a leaf. */

    maxDepth() {
        if (!this.root) return 0;

        function maxDepthHelper(node) {
            if (node.left === null && node.right === null) return 1;
            if (node.left === null) return maxDepthHelper(node.right) + 1;
            if (node.right === null) return maxDepthHelper(node.left) + 1;
            return (
                Math.max(
                    maxDepthHelper(node.left),
                    maxDepthHelper(node.right)
                ) + 1
            );
        }

        return maxDepthHelper(this.root);
    }

    /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
     * The path doesn't need to start at the root, but you can't visit a node more than once. */

    maxSum() {
        let result = 0;

        function maxSumHelper(node) {
            if (node === null) return 0;
            const leftSum = maxSumHelper(node.left);
            const rightSum = maxSumHelper(node.right);
            result = Math.max(result, node.val + leftSum + rightSum);
            return Math.max(0, leftSum + node.val, rightSum + node.val);
        }

        maxSumHelper(this.root);
        return result;
    }

    /** nextLarger(lowerBound): return the smallest value in the tree
     * which is larger than lowerBound. Return null if no such value exists. */

    nextLarger(lowerBound) {
        if (!this.root) return null;

        // let's use BFS for this!
        let queue = [this.root];
        let closest = null;

        while (queue.length) {
            let currentNode = queue.shift();
            let currentVal = currentNode.val;
            let higherThanLowerBound = currentVal > lowerBound;
            let shouldReassignClosest =
                currentVal < closest || closest === null;

            if (higherThanLowerBound && shouldReassignClosest) {
                closest = currentVal;
            }

            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }

        return closest;
    }

    /** Further study!
     * areCousins(node1, node2): determine whether two nodes are cousins
     * (i.e. are at the same level but have different parents. ) */

    areCousins(node1, node2) {
        if (node1 === this.root || node2 === this.root) return false;

        function findLevelAndParent(
            nodeToFind,
            currentNode,
            level = 0,
            data = {level: 0, parent: null}
        ) {
            if (data.parent) return data;
            if (
                currentNode.left === nodeToFind ||
                currentNode.right === nodeToFind
            ) {
                data.level = level + 1;
                data.parent = currentNode;
            }
            if (currentNode.left) {
                findLevelAndParent(
                    nodeToFind,
                    currentNode.left,
                    level + 1,
                    data
                );
            }
            if (currentNode.right) {
                findLevelAndParent(
                    nodeToFind,
                    currentNode.right,
                    level + 1,
                    data
                );
            }
            return data;
        }

        let node1Info = findLevelAndParent(node1, this.root);
        let node2Info = findLevelAndParent(node2, this.root);

        let sameLevel =
            node1Info && node2Info && node1Info.level === node2Info.level;
        let differentParents =
            node1Info && node2Info && node1Info.parent !== node2Info.parent;
        return sameLevel && differentParents;
    }

    /** Further study!
     * serialize(tree): serialize the BinaryTree object tree into a string.
     *
     * Output looks like this:
     *   1 2 # # 3 4 # # 5 # #
     *  Where # represents # children with a pre-order traversal.
     */

    static serialize(tree) {
        const values = [];

        function traverse(node) {
            if (node) {
                values.push(node.val);
                traverse(node.left);
                traverse(node.right);
            } else {
                values.push('#');
            }
        }

        traverse(tree.root);
        return values.join(' ');
    }

    /** Further study!
     * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

    static deserialize(stringTree) {
        if (!stringTree) return null;

        const values = stringTree.split(' ');

        function buildTree() {
            // building a tree starting from the beginning of the array
            if (values.length) {
                const currentVal = values.shift();

                if (currentVal === '#') return null;

                // remember to convert values back into numbers
                let currentNode = new BinaryTreeNode(+currentVal);
                currentNode.left = buildTree();
                currentNode.right = buildTree();

                return currentNode;
            }
        }

        const root = buildTree();
        return new BinaryTree(root);
    }

    /** Further study!
     * lowestCommonAncestor(node1, node2): find the lowest common ancestor
     * of two nodes in a binary tree. */

    lowestCommonAncestor(node1, node2, currentNode = this.root) {
        // base case 1: empty tree
        if (currentNode === null) return null;

        // base case 2: root is one of the target nodes
        if (currentNode === node1 || currentNode === node2) return currentNode;

        // recursively search the left sub-tree
        const left = this.lowestCommonAncestor(node1, node2, currentNode.left);

        // recursively search the right sub-tree
        const right = this.lowestCommonAncestor(
            node1,
            node2,
            currentNode.right
        );

        // if neither left nor right is null, currentNode is the ancestor
        if (left !== null && right !== null) return currentNode;

        // if one node is not null, return it
        if (left !== null || right !== null) return left || right;

        // left and right are both null, return null
        if (left === null && right === null) return null;
    }
}

let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
tree.DFSPreOrder();
tree.DFSPostOrder();
tree.DFSInOrder();

console.log('DFSPreOrder ', tree.DFSPreOrder());
console.log('DFSPostOrder ', tree.DFSPostOrder());
console.log('DFSInOrder ', tree.DFSInOrder());
console.log('BFS ', tree.BFS());
