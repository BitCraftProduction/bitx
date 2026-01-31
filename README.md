# BitX

A minimal static UI language that compiles `.bitx` files into pure HTML.  
**No JavaScript Runtime. No Virtual DOM. Just Semantic HTML.**

## Installation

```bash
npm install -g @bitxdev/bitx
# or run directly
npx bitx build
```

## Usage

### 1. Write Code (`main.bitx`)
```
App {
  Page {
    Column {
      Text("Hello World")
      Button("Click Me")
    }
  }
}
```

### 2. Build
```bash
bitx build main.bitx
# Generates dist/index.html
```

### 3. Dev Mode
```bash
bitx dev main.bitx
# Serve at http://localhost:3000
```

## Features
- **Zero Runtime**: Compiles to raw HTML/CSS.
- **Type Safe**: (Coming soon)
- **Fast**: Instant compilation.

## License
ISC
