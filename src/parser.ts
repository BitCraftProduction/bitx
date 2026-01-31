import { Node } from './ast';

export class Parser {
  private pos = 0;
  private input: string;

  constructor(input: string) {
    this.input = input;
  }

  parse(): Node[] {
    const nodes: Node[] = [];
    while (this.pos < this.input.length) {
      this.skipWhitespace();
      if (this.pos >= this.input.length) break;
      nodes.push(this.parseNode());
    }
    return nodes;
  }

  private parseNode(): Node {
    const type = this.readIdentifier();
    const args: string[] = [];
    const children: Node[] = [];

    this.skipWhitespace();

    // Parse Arguments: ( "arg1", "arg2" )
    if (this.peek() === '(') {
      this.consume(); // (
      while (this.peek() !== ')' && this.pos < this.input.length) {
        this.skipWhitespace();
        if (this.peek() === ')') break;
        args.push(this.readString());
        this.skipWhitespace();
        if (this.peek() === ',') {
          this.consume();
        }
      }
      this.consume(); // )
    }

    this.skipWhitespace();

    // Parse Children: { Child... }
    if (this.peek() === '{') {
      this.consume(); // {
      while (this.peek() !== '}' && this.pos < this.input.length) {
        this.skipWhitespace();
        if (this.peek() === '}') break;
        children.push(this.parseNode());
        this.skipWhitespace();
      }
      this.consume(); // }
    }

    return { type, args, children };
  }

  private readIdentifier(): string {
    const start = this.pos;
    while (/[a-zA-Z0-9]/.test(this.peek())) {
      this.consume();
    }
    return this.input.substring(start, this.pos);
  }

  private readString(): string {
    this.consume(); // "
    const start = this.pos;
    while (this.peek() !== '"' && this.pos < this.input.length) {
      this.consume();
    }
    const val = this.input.substring(start, this.pos);
    this.consume(); // "
    return val;
  }

  private skipWhitespace() {
    while (/\s/.test(this.peek())) {
      this.consume();
    }
  }

  private peek(): string {
    return this.input[this.pos] || '';
  }

  private consume() {
    this.pos++;
  }
}
