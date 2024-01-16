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
