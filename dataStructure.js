class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        var newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    pop() {
        if (!this.head) return undefined;
        var current = this.head;
        var newTail = current;
        while (current.next) {
            newTail = current;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }

    popMe() {
        if (!this.head) return undefined;

        let curNode = this.head;
        let prev = null;

        while (curNode) {
            if (curNode === this.tail) {
                this.tail = prev;
                this.tail.next = null;
                this.length--;
            } else {
                prev = curNode;
                curNode = curNode.next;
            }
        }
        return prev;
    }

    pushMe(val) {
        let newNode = new Node(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
            this.length++;
        } else {
            this.tail.next = newNode;
            this.tail = this.tail.next;
            this.length++;
        }

        return this;
    }
    shift() {
        if (!this.head) return undefined;
        var currentHead = this.head;
        this.head = currentHead.next;
        this.length--;
        if (this.length === 0) {
            this.tail = null;
        }
        return currentHead;
    }
    unshift(val) {
        var newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        }
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
        return this;
    }
    get(index) {
        if (index < 0 || index >= this.length) return null;
        var counter = 0;
        var current = this.head;
        while (counter !== index) {
            current = current.next;
            counter++;
        }
        return current;
    }
    set(index, val) {
        var foundNode = this.get(index);
        if (foundNode) {
            foundNode.val = val;
            return true;
        }
        return false;
    }
    insert(index, val) {
        if (index < 0 || index > this.length) return false;
        if (index === this.length) return !!this.push(val);
        if (index === 0) return !!this.unshift(val);

        var newNode = new Node(val);
        var prev = this.get(index - 1);
        var temp = prev.next;
        prev.next = newNode;
        newNode.next = temp;
        this.length++;
        return true;
    }
    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        var previousNode = this.get(index - 1);
        var removed = previousNode.next;
        previousNode.next = removed.next;
        this.length--;
        return removed;
    }
    reverse() {
        var curNode = this.head;
        this.head = this.tail;
        this.tail = curNode;
        var nextTemp;
        var prevTemp = null;
        for (var i = 0; i < this.length; i++) {
            nextTemp = curNode.next;
            console.log('nextTemp = curNode.next;', nextTemp?.val);

            curNode.next = prevTemp;
            console.log('curNode.next = prev;', curNode.next?.val);

            prevTemp = curNode;
            console.log('prev = curNode;', prevTemp?.val);

            curNode = nextTemp;
            console.log('curNode = temp: CurrentNode', curNode?.val);

            console.log(
                '*******************************************************'
            );
        }
        return this;
    }
    print() {
        var arr = [];
        var current = this.head;
        while (current) {
            arr.push(current.val);
            current = current.next;
        }
        console.log(arr);
    }

    travers() {
        let cur = this.head;
        let curVal = 1;
        let arr = [];
        while (cur) {
            if (curVal % 2 === 1) {
                arr.push(cur.val);
            }
            cur = cur.next;
            curVal++;
        }
        return arr;
    }

    reverseMe() {
        console.log(this.length);
        if (this.length === 0) return undefined;
        if (this.length === 1) return this;

        let curNode = this.head;
        let newTail = this.head;
        let prev = null;

        for (let i = 0; i < this.length; i++) {
            let temp = curNode.next;
            curNode.next = prev;
            prev = curNode;
            curNode = temp;
        }

        this.head = this.tail;
        this.tail = newTail;

        return this;
    }
}

var list = new SinglyLinkedList();

list.pushMe(1);
list.pushMe(2);
list.pushMe(3);
list.pushMe(4);

console.log('after push', list.length);

list.print();
// console.log(list.popMe());
// console.log(list.popMe());
// console.log(list.popMe());
// console.log(list.popMe());
// console.log(list.popMe());
// console.log(list.popMe());
// console.log(list.popMe());
list.reverseMe();
list.print();
// list.reverse();

// let result = list.travers();
// console.log(result);

// console.log(list.print());

////////////////////////////////////////////////////////////////////////////////////////////////////////

//****************************************************************************************************//

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        var newNode = new Node(val);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    pop() {
        if (!this.head) return undefined;
        var poppedNode = this.tail;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = poppedNode.prev;
            this.tail.next = null;
            poppedNode.prev = null;
        }
        this.length--;
        return poppedNode;
    }
    shift() {
        if (this.length === 0) return undefined;
        var oldHead = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = oldHead.next;
            this.head.prev = null;
            oldHead.next = null;
        }
        this.length--;
        return oldHead;
    }
    unshift(val) {
        var newNode = new Node(val);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    get(index) {
        if (index < 0 || index >= this.length) return null;
        var count, current;
        if (index <= this.length / 2) {
            count = 0;
            current = this.head;
            while (count !== index) {
                current = current.next;
                count++;
            }
        } else {
            count = this.length - 1;
            current = this.tail;
            while (count !== index) {
                current = current.prev;
                count--;
            }
        }
        return current;
    }
    set(index, val) {
        var foundNode = this.get(index);
        if (foundNode != null) {
            foundNode.val = val;
            return true;
        }
        return false;
    }
    insert(index, val) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !!this.unshift(val);
        if (index === this.length) return !!this.push(val);

        var newNode = new Node(val);
        var beforeNode = this.get(index - 1);
        var afterNode = beforeNode.next;

        (beforeNode.next = newNode), (newNode.prev = beforeNode);
        (newNode.next = afterNode), (afterNode.prev = newNode);
        this.length++;
        return true;
    }
    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        var removedNode = this.get(index);
        var beforeNode = removedNode.prev;
        var afterNode = removedNode.next;
        beforeNode.next = afterNode;
        afterNode.prev = beforeNode;
        // removedNode.prev.next = removedNode.next;
        // removedNode.next.prev = removedNode.prev;
        removedNode.next = null;
        removedNode.prev = null;
        this.length--;
        return removedNode;
    }
}

var list = new DoublyLinkedList();
list.push('Harry');
list.push('Ron');
list.push('Hermione');

////////////////////////////////////////////////////////////////////////////////////////////////////////

//****************************************************************************************************//

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    push(val) {
        var newNode = new Node(val);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            var temp = this.first;
            this.first = newNode;
            this.first.next = temp;
        }
        return ++this.size;
    }
    pop() {
        if (!this.first) return null;
        var temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
    peek() {
        return this.first.val;
    }

    /** isEmpty(): return true if the stack is empty, otherwise false */

    isEmpty() {
        return this.size === 0;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//****************************************************************************************************//

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue(val) {
        var newNode = new Node(val);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        return ++this.size;
    }

    dequeue() {
        if (!this.first) return null;

        var temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
    peek() {
        return this.first.val;
    }

    /** isEmpty(): return true if the queue is empty, otherwise false */

    isEmpty() {
        return this.size === 0;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//****************************************************************************************************//

// /** TreeNode: node for a general tree. */

class TreeNode {
    constructor(val, children = []) {
        this.val = val;
        this.children = children;
    }
}

class Tree {
    constructor(root = null) {
        this.root = root;
    }

    findDFS(val) {
        let toVisitStack = [this];
        while (toVisitStack.length) {
            let curNode = toVisitStack.pop();
            if (curNode.val === val) {
                return curNode;
            }

            for (let child of curNode.children) {
                toVisitStack.push(child);
            }
        }
    }

    findBFS(val) {
        let toVisitStack = [this];
        let curNode;
        while (toVisitStack.length) {
            curNode = toVisitStack.shift();
            if ((curNode.val = val)) {
                return curNode;
            }
            for (let child of curNode.children) {
                toVisitStack.push(child);
            }
        }
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

let amy = new TreeNode('amy', [
    new TreeNode('bob'),
    new TreeNode('barb'),
    new TreeNode('barry'),
]);

////////////////////////////////////////////////////////////////////////////////////////////////////////

//****************************************************************************************************//

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
        var node = this.root,
            data = [],
            queue = [];
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

// var tree = new BinarySearchTree();
// tree.insert(10);
// tree.insert(6);
// tree.insert(15);
// tree.insert(3);
// tree.insert(8);
// tree.insert(20);
// tree.DFSPreOrder();
// tree.DFSPostOrder();
// tree.DFSInOrder();

////////////////////////////////////////////////////////////////////////////////////////////////////////

//****************************************************************************************************//

// class HashTable {
//     constructor(size = 53) {
//         this.keyMap = new Array(size);
//     }

//     _hash(key) {
//         let total = 0;
//         let WEIRD_PRIME = 31;
//         for (let i = 0; i < Math.min(key.length, 100); i++) {
//             let char = key[i];
//             let value = char.charCodeAt(0) - 96;
//             total = (total * WEIRD_PRIME + value) % this.keyMap.length;
//         }
//         return total;
//     }
//     set(key, value) {
//         let index = this._hash(key);
//         if (!this.keyMap[index]) {
//             this.keyMap[index] = [];
//         }
//         this.keyMap[index].push([key, value]);
//     }
//     get(key) {
//         let index = this._hash(key);
//         if (this.keyMap[index]) {
//             for (let i = 0; i < this.keyMap[index].length; i++) {
//                 if (this.keyMap[index][i][0] === key) {
//                     return this.keyMap[index][i][1];
//                 }
//             }
//         }
//         return undefined;
//     }
//     keys() {
//         let keysArr = [];
//         for (let i = 0; i < this.keyMap.length; i++) {
//             if (this.keyMap[i]) {
//                 for (let j = 0; j < this.keyMap[i].length; j++) {
//                     if (!keysArr.includes(this.keyMap[i][j][0])) {
//                         keysArr.push(this.keyMap[i][j][0]);
//                     }
//                 }
//             }
//         }
//         return keysArr;
//     }
//     values() {
//         let valuesArr = [];
//         for (let i = 0; i < this.keyMap.length; i++) {
//             if (this.keyMap[i]) {
//                 for (let j = 0; j < this.keyMap[i].length; j++) {
//                     if (!valuesArr.includes(this.keyMap[i][j][1])) {
//                         valuesArr.push(this.keyMap[i][j][1]);
//                     }
//                 }
//             }
//         }
//         return valuesArr;
//     }
// }

// let ht = new HashTable(17);
// ht.set('maroon', '#800000');
// ht.set('yellow', '#FFFF00');
// ht.set('olive', '#808000');
// ht.set('salmon', '#FA8072');
// ht.set('lightcoral', '#F08080');
// ht.set('mediumvioletred', '#C71585');
// ht.set('plum', '#DDA0DD');
// ht.set('purple', '#DDA0DD');
// ht.set('violet', '#DDA0DD');

// ht.keys().forEach(function (key) {
//     console.log(ht.get(key));
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////

//****************************************************************************************************//

// class Graph {
//     constructor() {
//         this.adjacencyList = {};
//     }
//     addVertex(vertex) {
//         if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
//     }
//     addEdge(v1, v2) {
//         this.adjacencyList[v1].push(v2);
//         this.adjacencyList[v2].push(v1);
//     }
//     removeEdge(vertex1, vertex2) {
//         this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
//             v => v !== vertex2
//         );
//         this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
//             v => v !== vertex1
//         );
//     }
//     removeVertex(vertex) {
//         while (this.adjacencyList[vertex].length) {
//             const adjacentVertex = this.adjacencyList[vertex].pop();
//             this.removeEdge(vertex, adjacentVertex);
//         }
//         delete this.adjacencyList[vertex];
//     }
//     depthFirstRecursive(start) {
//         const result = [];
//         const visited = {};
//         const adjacencyList = this.adjacencyList;

//         (function dfs(vertex) {
//             if (!vertex) return null;
//             visited[vertex] = true;
//             result.push(vertex);
//             adjacencyList[vertex].forEach(neighbor => {
//                 if (!visited[neighbor]) {
//                     return dfs(neighbor);
//                 }
//             });
//         })(start);

//         return result;
//     }
//     depthFirstIterative(start) {
//         const stack = [start];
//         const result = [];
//         const visited = {};
//         let currentVertex;

//         visited[start] = true;
//         while (stack.length) {
//             currentVertex = stack.pop();
//             result.push(currentVertex);

//             this.adjacencyList[currentVertex].forEach(neighbor => {
//                 if (!visited[neighbor]) {
//                     visited[neighbor] = true;
//                     stack.push(neighbor);
//                 }
//             });
//         }
//         return result;
//     }
//     breadthFirst(start) {
//         const queue = [start];
//         const result = [];
//         const visited = {};
//         let currentVertex;
//         visited[start] = true;

//         while (queue.length) {
//             currentVertex = queue.shift();
//             result.push(currentVertex);

//             this.adjacencyList[currentVertex].forEach(neighbor => {
//                 if (!visited[neighbor]) {
//                     visited[neighbor] = true;
//                     queue.push(neighbor);
//                 }
//             });
//         }
//         return result;
//     }
// }

// let g = new Graph();

// g.addVertex('A');
// g.addVertex('B');
// g.addVertex('C');
// g.addVertex('D');
// g.addVertex('E');
// g.addVertex('F');

// g.addEdge('A', 'B');
// g.addEdge('A', 'C');
// g.addEdge('B', 'D');
// g.addEdge('C', 'E');
// g.addEdge('D', 'E');
// g.addEdge('D', 'F');
// g.addEdge('E', 'F');

// //          A
// //        /   \
// //       B     C
// //       |     |
// //       D --- E
// //        \   /
// //          F

// // QUEUE: []
// // RESULT: [A, B, C, D, E, F]

////////////////////////////////////////////////////////////////////////////////////////////////////////

//****************************************************************************************************//
