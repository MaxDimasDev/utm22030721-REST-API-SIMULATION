class Node {
    constructor(data) {
      this.data = data;
      this.prev = null;
      this.next = null;
    }
  }
  
  class doubleLinkedList {
    constructor(data) {
      this.head = null;
      this.tail = null;
      if (data !== undefined) {
        this.append(data);
      }
    }
  
    append(data) {
      if (!data) return "No hay dato";
      const newNode = new Node(data);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
  
    prepend(data) {
      if (!data) return "No hay dato";
      const newNode = new Node(data);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
    }
  
    insertAfterNode(node, value) {
      if (!node || !value) return "No node or value provided";
      const newNode = new Node(value);
      newNode.prev = node;
      newNode.next = node.next;
      if (node.next) {
        node.next.prev = newNode;
      } else {
        this.tail = newNode;
      }
      node.next = newNode;
    }
  
    traverse() {
      let current = this.head;
      while (current) {
        console.log(current.data);
        current = current.next;
      }
    }
  
    reverseTraverse() {
      let current = this.tail;
      while (current) {
        console.log(current.data);
        current = current.prev;
      }
    }
  
    deleteNode(node) {
      if (!node) return "No node provided";
      if (node === this.head && node === this.tail) {
        this.head = null;
        this.tail = null;
      } else if (node === this.head) {
        this.head = this.head.next;
        this.head.prev = null;
      } else if (node === this.tail) {
        this.tail = this.tail.prev;
        this.tail.next = null;
      } else {
        node.prev.next = node.next;
        node.next.prev = node.prev;
      }
      return "Node deleted";
    }
  
    deleteHead() {
      if (!this.head) return "No hay lista";
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
    }
  
    deleteTail() {
      if (!this.head) return "No hay lista";
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
    }
  }
  
//   const list = new doubleLinkedList(10);
//   list.append(20);
//   list.prepend(5);
//   list.traverse();