const { LinkedList, Node } = require("./LinkedList");

describe("Node factory function", () => {
  test("has value and null as nextNode when initially created", () => {
    const node0 = Node(3);
    expect(node0).toEqual({value: 3, nextNode: null});
  });

  test("the pointer nextNode points to the next node", () => {
    const node0 = Node(3);
    const node1 = Node(5);
    node0.nextNode = node1;
    expect(node0.nextNode.value).toBe(5);
  });
});

describe("LinkedList factory function", () => {
  test("value of headNode is null when initially created", () => {
    expect(LinkedList().headNode).toBeNull();
  });
});

describe("LinkedList.append()", () => {
  const l = LinkedList();

  test("appends to an empty linked list", () => {
    l.append(5);
    expect(l.headNode.value).toBe(5);
  });
  
  test("appends to a not-empty linked list", () => {
    l.append(7);
    expect(l.headNode.nextNode.value).toBe(7);
  });
});

describe("LinkedList.prepend()", () => {
  const l = LinkedList();

  test("prepends to an empty linked list", () => {
    l.prepend(5);
    expect(l.headNode.value).toBe(5);
    expect(l.headNode.nextNode).toBeNull();
  });

  test("prepends to a not-empty linked list", () => {
    l.prepend(3);
    expect(l.headNode.value).toBe(3);
    expect(l.headNode.nextNode.value).toBe(5);
  });
});

describe("LinkedList.size()", () => {
  const l = LinkedList();

  test("returns a size of 0 when given an empty linked list", () => {
    expect(l.size()).toBe(0);
  });

  test("returns correct number of size when given a not-empty linked list", () => {
    l.append(3);
    l.append(5);
    l.prepend(1);
    expect(l.size()).toBe(3);
  });
});

describe("LinkedList.head()", () => {
  const l = LinkedList();

  test("returns null if the linked list is empty", () => {
    expect(l.head()).toBeNull();
  });

  test("returns the first node in the linked list", () => {
    l.append(3);
    expect(l.head().value).toBe(3);
    l.prepend(1);
    expect(l.head().value).toBe(1);
  });
});

describe("LinkedList.tail()", () => {
  const l = LinkedList();

  test("returns null if the linked list is empty", () => {
    expect(l.tail()).toBeNull();
  });

  test("returns the last node in the linked list", () => {
    l.append(3);
    expect(l.tail().value).toBe(3);
    l.prepend(1);
    l.append(5);
    expect(l.tail().value).toBe(5);
  });
});

describe("LinkedList.at(index)", () => {
  const l = LinkedList();
  l.append(1);
  l.append(3);
  l.append(5);
  l.prepend(-1);

  test("returns the node at index", () => {
    expect(l.at(0).value).toBe(-1);
    expect(l.at(2).value).toBe(3);
    expect(l.at(3).value).toBe(5);
  });

  test("returns null if the node at index is not found", () => {
    expect(l.at(5)).toBeNull();
  });

  test("returns null if index is negative", () => {
    expect(l.at(-2)).toBeNull();
  });
});

describe("LinkedList.pop()", () => {
  const l = LinkedList();

  test("removes nothing if the linked list is empty", () => {
    l.pop();
    expect(l.headNode).toBeNull();
  });

  test("removes the node in a one-node linked list", () => {
    l.append(1);
    l.pop();
    expect(l.headNode).toBeNull();
  });

  test("removes the last node", () => {
    l.append(0);
    l.append(1);
    l.append(2);
    l.pop();
    expect(l.tail().value).toBe(1);
    l.pop();
    expect(l.tail().value).toBe(0);
  });
});

describe("LinkedList.contains(qValue)", () => {
  const l = LinkedList();
  l.append(1);

  test("returns true if value is in the linked list", () => {
    expect(l.contains(1)).toBeTruthy();
  });

  test("returns false if value is not in the linked list", () => {
    expect(l.contains(3)).toBeFalsy();
  });
});

describe("LinkedList.find(qValue)", () => {
  const l = LinkedList();
  l.append(0);
  l.append(3);
  l.append(5);

  test("returns the index of the node containing the qValue", () => {
    expect(l.find(3)).toBe(1);
  });

  test("returns null if the qValue is not inside the linked list", () => {
    expect(l.find(2)).toBeNull();
  });
});

describe("LinkedList.toString()", () => {
  const l = LinkedList();

  test("returns null if the linked list is empty", () => {
    expect(l.toString()).toBe("null");
  });

  test("returns the preview in correct format", () => {
    l.append(1);
    l.append(3);
    expect(l.toString()).toBe("( 1 ) -> ( 3 ) -> null");
  });

  test("returns the preview after some manupilations to the linked list", () => {
    l.prepend(0);
    l.append(6);
    l.pop();
    expect(l.toString()).toBe("( 0 ) -> ( 1 ) -> ( 3 ) -> null");
    l.pop();
    l.pop();
    l.pop();
    expect(l.toString()).toBe("null");
  });
});

describe("LinkedList.insertAt(value, index)", () => {
  const l = LinkedList();

  test("inserts the node at index 0", () => {
    l.insertAt(3, 0);
    expect(l.at(0).value).toBe(3);
  });

  test("inserts correctly at index", () => {
    l.append(7);
    l.insertAt(5, 1);
    expect(l.at(1).value).toBe(5);
  });

  test("does not insert anything if index is outside the linked list", () => {
    l.insertAt(9, 3);
    expect(l.tail().value).toBe(7);
  });
});

describe("LinkedList.removeAt(index)", () => {
  const l = LinkedList();

  test("removes nothing if linked list is empty", () => {
    l.removeAt(0);
    expect(l.size()).toBe(0);
  });

  test("removes nothing if index is outside the linked list", () => {
    l.append(3);
    l.removeAt(1);
    expect(l.size()).toBe(1);
  });

  test("removes a node at index 0 from single-node linked list", () => {
    l.removeAt(0);
    expect(l.size()).toBe(0);
  });

  test("removes a node in the middle of a linked list", () => {
    l.append(1);
    l.append(3);
    l.append(5);
    l.removeAt(1);
    expect(l.toString()).toBe("( 1 ) -> ( 5 ) -> null");
  });

  test("removes the last node given index of .size() - 1", () => {
    l.removeAt(l.size() - 1);
    expect(l.toString()).toBe("( 1 ) -> null");
  });
});