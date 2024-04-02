/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  //get node at given index
  get(idx) {
    let currentNode = this.head;
    for (let i = 0; i <= idx - 1; i++){
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  //index validator
  validateIdx(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("index is invalid.");
    }
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    // if list is empty, set head and tail as newNode
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length += 1
    }
    //update old tail's next val, make newNode the tail, and increment length
    else { 
      this.tail.next = newNode;
      this.tail = newNode;
      this.length += 1;
    }
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val)

    //add to empty list
    if (!this.head && this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
    } 
    else {
      newNode.next = this.head;
      this.head = newNode; 
      this.length += 1;
    }
  }

  /** pop(): return & remove last item. */

  pop() {
    const last = this.tail;

    //handle 1 item list
    if (this.length == 1){
      this.head = null;
      this.tail = null;
      this.length = 0;
      return last.val;
    }

    //get 2nd-to-last node
    let node = this.get(this.length - 2);

    //set new tail & decrement length
    node.next = null; 
    this.tail = node;
    this.length -= 1;

    return last.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    const first = this.head;
    
    //if only one node in list
    if (this.length == 1){
      this.head = null;
      this.tail = null;
      this.length = 0;
      return first.val;
    } 
    else {
    //make 2nd node the new head & cut 1st from list
      this.head = first.next; 
      first.next = null;

      this.length -= 1;
      return first.val;
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    this.validateIdx(idx);

    const node = this.get(idx)
    return node.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    this.validateIdx(idx);
    //traverse to node at idx
    const node = this.get(idx);
    node.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    //custom validator 
    if (idx > this.length || idx < 0) {
      throw new Error("index is invalid.");
    }

    if (idx === this.length) return this.push(val);
    if (idx === 0) return this.unshift(val);
    
    const newNode = new Node(val);
    const prevNode = this.get(idx - 1);

    newNode.next = prevNode.next;
    prevNode.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    this.validateIdx(idx);

    if (idx === this.length - 1) return this.pop();
    if (idx === 0) return this.shift();

    let prevNode = this.get(idx - 1);
    let currNode = this.get(idx);

    prevNode.next = currNode.next;
    currNode.next = null;

    return currNode.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let sum = 0;
    //sum up all list vals
    let currentNode = this.head;
    while(currentNode){
     sum += currentNode.val;
     currentNode = currentNode.next;
    }

    const avg = sum / this.length;
    return avg;
  }
}

module.exports = LinkedList;