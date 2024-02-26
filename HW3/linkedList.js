class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
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
      this.head = newNode;
    }
  }

  insertAfterNode(node, value) {
    if (!node || !value) return "No existe el nodo o el valor proporcionado";
    let current = this.head;
    const newNode = new Node(value);
    while (current) {
      if (current === node) {
        newNode.next = current.next;
        current.next = newNode;
        if (current === this.tail) {
          this.tail = newNode;
        }
        return "Nodo  insertado correctamente";
      }
      current = current.next;
    }
    return "Nodo  no encontrado en la lista";
  }

  traverse() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }

  deleteNode(element) {
    if (!element || !this.head) {
      return "No hay parametro o lista";
    }
    if (this.head.data === element) {
      this.head = this.head.next;
      if (this.head === null) {
        this.tail = null;
      }
      return "El elemento indicado era la cabeza";
    }
    let current = this.head;
    while (current.next) {
      if (current.next.data === element) {
        if (current.next === this.tail) {
          this.tail = current;
          return "El elemento ingresado se ha borrado y era la cola";
        }
        current.next = current.next.next;
        return "Elemento borrado";
      }
      current = current.next;
    }
    return "Elemento no encontrado";
  }

  deleteHead() {
    if (!this.head) {
      return "Error!! No hay elementos en la lista.";
    }
    this.head = this.head.next;

    if (this.head === null) {
      this.tail = null;
    }
  }

  deleteTail() {
    if (!this.head) return "No hay lista";
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    }
    let current = this.head;
    while (current.next) {
      if (current.next === this.tail) {
        this.tail = current;
        return "La cola se reasigno";
      }
      current = current.next;
    }
  }
}

// const list = new LinkedList(10);
// list.append(20);
// list.prepend(5);
// list.traverse();