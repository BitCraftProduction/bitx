
export interface Node {
  type: string;
  args?: string[];
  children?: Node[];
}

// Helper types for specific nodes if needed mostly for clarity
export interface ElementNode extends Node {
  children?: Node[];
}

export interface LeafNode extends Node {
  args: string[];
}
