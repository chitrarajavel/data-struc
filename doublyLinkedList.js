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
        let newNode = new Node(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            let temp = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
            this.tail.prev = temp;
        }

        this.length++;

        return this;
    }

    pop() {
        if (!this.head) return undefined;
        let temp = this.tail;
        if (this.length === 1) {
            this.head === null;
            this.tail === null;
        } else {
            this.tail = temp.prev;
            this.tail.next = null;
            temp.prev = null;
        }

        this.length--;
        return temp;
    }

    unShift(val) {
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
    reverse() {
        if (this.length === 0) return undefined;
        if (this.length === 1) return this;
        let curNode = this.head;
        let newTail = this.head;
        let cur = 0;

        while (cur < this.length) {
            console.log(curNode);
            let next = curNode.next;
            let prev = curNode.prev;
            curNode.next = prev; // null
            curNode.prev = next;
            curNode = next;
            cur++;
        }

        this.head = this.tail;
        this.tail = newTail;
        return this;
    }

    getIndex(index) {
        if (index < 0 || index > this.length) return undefined;

        let currentNode;

        if (index <= this.length / 2) {
            currentNode = this.head;
            for (let i = 0; i < index; i++) {
                currentNode = currentNode.next;
            }
        } else {
            currentNode = this.tail;
            for (let i = this.length - 1; i >= index; i--)
                currentNode = currentNode.prev;
        }
        return currentNode;
    }

    set(index, val) {
        let foundNode = this.getIndex(index);

        if (foundNode !== null) {
            foundNode.val = val;
            return true;
        }
        return false;
    }

    insert(index, val) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return this.unShift(val);
        if (index === this.length) return this.push(val);

        let prevNode = this.getIndex(index - 1);
        let nextNode = prevNode.next;
        let insertedNode = new Node(val);

        prevNode.next = insertedNode;
        insertedNode.next = nextNode;
        nextNode.prev = insertedNode;
        insertedNode.prev = prevNode;

        this.length++;

        return true;
    }

    removeIndex(index) {
        if (index < 0 || index > this.length - 1) return false;
        if (index === 0) return this.shift(this.getIndex(index));
        if (index === this.length - 1) return this.pop(this.getIndex(index));

        let removedNode = this.getIndex(index);
        let prevNode = removedNode.prev;
        let nextNode = removedNode.next;

        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        removedNode.next = null;
        removedNode.prev = null;

        this.length--;

        return true;
    }

    findNode(val) {
        let curNode = this.head;
        let foundNode = null;

        for (let i = 0; i < this.length; i++) {
            if (curNode.val === val) {
                foundNode = curNode;
                return foundNode;
            }
            curNode = curNode.next;
        }
        return foundNode;
    }

    deleteNode(val) {
        let nodeToDelete = this.findNode(val);
        let prevNode = nodeToDelete.prev;
        let nextnode = nodeToDelete.next;

        prevNode.next = nextnode;
        nextnode.prev = prevNode;
        nodeToDelete.next = null;
        nodeToDelete.prev = null;
        this.length--;
        return this;
    }

    print() {
        let arr = [];
        if (!this.head) return undefined;
        let curNode = this.head;

        for (let i = 0; i < this.length; i++) {
            arr.push(curNode.val);
            curNode = curNode.next;
        }
        return arr;
    }
}

let list = new DoublyLinkedList();

list.push(8);
list.push(2);
list.push(6);
list.push(4);
list.push(4);

console.log(list);

console.log(list.length);

console.log(list.print());

// list.pop();

console.log(list.print());

// list.reverse();

// console.log(list.print());

console.log(list.getIndex(2));

list.set(2, 11);

console.log(list.print());

list.insert(0, 90);

console.log(list.print());

list.insert(2, 88);

console.log(list.print());

list.insert(6, 9);

console.log(list.print());

list.removeIndex(6);

console.log(list.print());

console.log(list.findNode(6));
console.log(list.findNode(4));

list.deleteNode(8);

console.log(list.print());
