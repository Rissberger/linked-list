class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) {
      this.push(val);
    }
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  pop() {
    if (!this.head) throw new Error("List is empty");
    let current = this.head;
    let newTail = current;
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
    return current.val;
  }

  shift() {
    if (!this.head) throw new Error("List is empty");
    let currentHead = this.head;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead.val;
  }

  getAt(idx) {
    if (idx < 0 || idx >= this.length) throw new Error("Invalid index");
    let counter = 0;
    let current = this.head;
    while (counter !== idx) {
      current = current.next;
      counter++;
    }
    return current.val;
  }

  setAt(idx, val) {
    if (idx < 0 || idx >= this.length) throw new Error("Invalid index");
    let current = this.head;
    for (let i = 0; i < idx; i++) {
      current = current.next;
    }
    current.val = val;
  }

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) throw new Error("Invalid index");
    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    const newNode = new Node(val);
    let prev = this.head;
    for (let i = 0; i < idx - 1; i++) {
      prev = prev.next;
    }
    newNode.next = prev.next;
    prev.next = newNode;
    this.length++;
  }

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) throw new Error("Invalid index");
    if (idx === 0) return this.shift();
    if (idx === this.length - 1) return this.pop();

    let prev = this.head;
    for (let i = 0; i < idx - 1; i++) {
      prev = prev.next;
    }
    const removed = prev.next;
    prev.next = removed.next;
    this.length--;
    return removed.val;
  }

  average() {
    if (!this.head) return 0; // Return 0 for an empty list

    let totalSum = 0;
    let currentNode = this.head;

    while (currentNode) {
      totalSum += currentNode.val;
      currentNode = currentNode.next;
    }

    return totalSum / this.length; // Use the length property of the list
  }
}

module.exports = LinkedList;
