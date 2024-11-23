class Node {
    constructor(id, text, x, y, width, height, parent, children) {
        this.id = id;
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.textWidth = width;
        this.height = height;
        this.parent = parent;
        this.children = children;
        this.childrenHeight = 0;
        this.childrenWidth = 0;
        this.childPosition = 0;
        this.checked = false;
        this.memo = "";
        this.memoWidth = 72;
        this.memoHeight = 35;
    }

    setParent(parent) {
        this.parent = parent;
        parent.addChild(this);
    }

    addChild(child) {
        this.children.push(child);
    }

    hasSibling() {
        if (!this.parent) return false;
        return this.parent.children.length > 1;
    }

    isRoot() {
        return !this.parent;
    }

    lastChild() {
        return this.children[this.children.length - 1];
    }
}

export default Node;
