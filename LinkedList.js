function LinkedList() {
  return {
    headNode: null,
    append(value) {
      if (!this.headNode) {
        this.headNode = Node(value);
      } else {
        let tail = this.headNode;
        while (tail.nextNode !== null) {
          tail = tail.nextNode;
        }
        tail.nextNode = Node(value);
      }
    },
    prepend(value) {
      const newHeadNode = Node(value);
      newHeadNode.nextNode = this.headNode;
      this.headNode = newHeadNode;
    },
    size() {
      let count = 0;
      let tail = this.headNode;
      if (!tail) {
        return count;
      } else {
        ++count;
        while (tail.nextNode !== null) {
          ++count;
          tail = tail.nextNode;
        }
        return count;
      }
    },
    head() {
      return this.headNode;
    },
    tail() {
      let tail = this.headNode;
      if (!tail) {
        return null;
      } else {
        while (tail.nextNode !== null) {
          tail = tail.nextNode;
        }
        return tail;
      }
    },
    at(index) {
      if (index === 0) {
        return this.headNode;
      } else if (index < 0 || index > this.size()) {
        return null;
      } else {
        let tail = this.headNode;
        let i = 0;
        while (tail.nextNode !== null && i < index) {
          tail = tail.nextNode;
          ++i;
        }
        return tail;
      }
    },
    pop() {
      let tail = this.headNode;
      let beforeTail;
      if (this.size() === 0) {
        return;
      } else if (this.size() === 1) {
        this.headNode = null;
      } else {
        while (tail.nextNode !== null) {
          beforeTail = tail;
          tail = tail.nextNode;
        }
        beforeTail.nextNode = null;
      }
    },
    contains(qValue) {
      let tail = this.headNode;
      if (tail) {
        while (tail.nextNode !== null) {
          if (tail.value === qValue) {
            return true;
          }
          tail = tail.nextNode;
        }
        return tail.value === qValue;
      }
    },
    find(qValue) {
      let tail = this.headNode;
      let index = 0;
      if (tail) {
        while (tail.nextNode !== null) {
          if (tail.value === qValue) {
            return index;
          }
          tail = tail.nextNode;
          ++index;
        }
        return null;
      }
    },
    toString() {
      let result = "";
      let tail = this.headNode;
      if (!tail) {
        result = result.concat(null);
        return result;
      } else {
        result = result.concat("( ", tail.value, " ) -> ");
        while (tail.nextNode !== null) {
          tail = tail.nextNode;
          result = result.concat("( ", tail.value, " ) -> ");
        }
        result = result.concat(null);
        return result;
      }
    },
    insertAt(value, index) {
      if (index === 0) {
        this.prepend(value);
      } else if (index >= this.size()) {
        return;
      } else {
        let i = 0;
        let tail = this.headNode;
        let beforeTail;
        while (i < index && tail.nextNode !== null) {
          beforeTail = tail;
          tail = tail.nextNode;
          ++i;
        }
        const insertedNode = Node(value);
        insertedNode.nextNode = tail;
        beforeTail.nextNode = insertedNode;
      }
    },
    removeAt(index) {
      if (index >= this.size()) {
        return;
      } else if (index === 0 && this.size() === 1) {
        this.headNode = null;
      } else {
        let i = 0;
        let tail = this.headNode;
        let beforeTail;
        while (i < index && tail.nextNode !== null) {
          beforeTail = tail;
          tail = tail.nextNode;
          ++i;
        }
        beforeTail.nextNode = tail.nextNode;
      }
    }
  }
}

function Node(value) {
  return {
    value: value,
    nextNode: null
  }
}

module.exports = { LinkedList, Node };