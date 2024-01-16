class TreeNode {
    constructor(val, children = []) {
        this.val = val;
        this.children = children;
    }
    findDFS(val) {
        let toVisitStack = [this];
        while (toVisitStack.length) {
            let curNode = toVisitStack.pop();
            if (curNode.val === val) {
                // return curNode;
                return true;
            }

            for (let child of curNode.children) {
                toVisitStack.push(child);
            }
        }
        // return null;
        return false;
    }

    findDFSOddNumbers() {
        let toVisitStack = [this];
        let oddArr = [];
        while (toVisitStack.length) {
            let curNode = toVisitStack.pop();
            if (curNode.val % 2 === 1) {
                oddArr.push(curNode.val);
            }
            for (let child of curNode.children) {
                toVisitStack.push(child);
            }
        }
        return oddArr;
    }

    findBFS(val) {
        let toVisitStack = [this];
        let curNode;
        while (toVisitStack.length) {
            curNode = toVisitStack.shift();
            console.log(curNode);
            if ((curNode.val = val)) {
                // return curNode;
                return true;
            }
            for (let child of curNode.children) {
                toVisitStack.push(child);
            }
        }
        // return null;
        return false;
    }

    findBFSEvenNums() {
        let toVisitQueue = [this];
        let evenArr = [];

        while (toVisitQueue.length) {
            let curNode = toVisitQueue.shift();
            if (curNode.val % 2 === 0) evenArr.push(curNode.val);
            for (let child of curNode.children) {
                toVisitQueue.push(child);
            }
        }
        return evenArr;
    }
}

class Tree {
    constructor(root = null) {
        this.root = root;
    }

    findInTreeDFSSearch(val) {
        return this.root.findDFS(val);
    }

    findInTreeBFSSearch(val) {
        return this.root.findBFS(val);
    }

    /** sumValues(): add up all of the values in the tree. */

    sumValues() {
        if (this.root === null) return 0;
        let sum = this.root.val;

        function checkChildren(node) {
            for (let child of node.children) {
                sum += child.val;
                if (child.children.length > 0) {
                    checkChildren(child);
                }
            }
        }
        checkChildren(this.root);
        return sum;
    }

    sumValues_CR() {
        if (this.root === null) return 0;
        sum = this.root.val;

        function sumChildren(node) {
            for (child of node.children) {
                sum = sum + child.val;
                if (child.children.length) checkChildren(child);
            }
        }
        sumChildren(this.root);
        return sum;
    }

    /** countEvens(): count all of the nodes in the tree with even values. */

    countEvens() {
        if (this.root === null) return 0;
        let count = 0;

        if (this.root.val % 2 === 0) {
            count++;
        }
        function checkChildren(node) {
            for (let child of node.children) {
                if (child.val % 2 === 0) {
                    count++;
                }
                if (child.children.length > 0) {
                    checkChildren(child);
                }
            }
        }
        checkChildren(this.root);
        return count;
    }

    /** numGreater(lowerBound): return a count of the number of nodes
     * whose value is greater than lowerBound. */

    numGreater(lowerBound) {
        if (this.root === null) return 0;
        let count = 0;
        if (this.root.val > lowerBound) {
            count++;
        }
        function checkChildren(node) {
            for (let child of node.children) {
                if (child.val > lowerBound) {
                    count++;
                }
                if (child.children.length > 0) {
                    checkChildren(child);
                }
            }
        }
        checkChildren(this.root);
        return count;
    }
}

// let amy = new TreeNode('amy', [
//     new TreeNode('bob'),
//     new TreeNode('barb'),
//     new TreeNode('barry'),
// ]);

let one = new TreeNode(1, []);
let two = new TreeNode(2, []);
let three = new TreeNode(3, []);
let four = new TreeNode(4, []);
let five = new TreeNode(5, []);
let six = new TreeNode(6, []);

let newTree = new Tree(one);

one.children.push(two);
one.children.push(three);
two.children.push(four);
two.children.push(five);
two.children.push(six);

let result = newTree.findInTreeDFSSearch(7);
console.log(result);

let oddNums = one.findDFSOddNumbers();
console.log('oddNums ', oddNums);

let evenNums = one.findBFSEvenNums();
console.log('evenNums ', evenNums);
