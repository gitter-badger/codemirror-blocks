import uuid from 'node-uuid'

export class AST {
  constructor(rootNodes) {
    this.nodeMap = new Map()
    this.rootNodes = rootNodes
    for (let rootNode of this.rootNodes) {
      for (let node of rootNode) {
        this.nodeMap.set(node.id, node)
      }
    }
  }
}

class ASTNode {
  constructor(from, to, type) {
    this.from = from
    this.to = to
    this.type = type
    this.id = uuid.v4()
  }
}

export class Expression extends ASTNode {
  constructor(from, to, func, args) {
    super(from, to, 'expression')
    this.func = func
    this.args = args
  }

  *[Symbol.iterator]() {
    yield this
    for (let arg of this.args) {
      for (let node of arg) {
        yield node
      }
    }
  }

  toString() {
    return `(${this.func} ${this.args.join(' ')})`
  }
}

export class Literal extends ASTNode {
  constructor(from, to, value) {
    super(from, to, 'literal')
    this.value = value
  }

  *[Symbol.iterator]() {
    yield this
  }

  toString() {
    return `${this.value}`
  }
}