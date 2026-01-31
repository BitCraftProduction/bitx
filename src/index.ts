import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { Parser } from './parser';
import { Compiler } from './compiler';

const args = process.argv.slice(2);
const command = args[0];

const VERSION = "0.1.0";

function printHelp() {
    console.log(`
BitX v${VERSION}
A minimal static UI language.

Usage:
  bitx build [file]    Compile .bitx to dist/index.html
  bitx dev [file]      Compile and serve at localhost:3000
  bitx --version       Show version
  bitx --help          Show help
`);
}

function build(inputFile: string, quiet = false) {
    if (!fs.existsSync(inputFile)) {
        console.error(`Error: File '${inputFile}' not found.`);
        process.exit(1);
    }

    try {
        const source = fs.readFileSync(inputFile, 'utf-8');
        const parser = new Parser(source);
        const ast = parser.parse();
        
        const compiler = new Compiler();
        const html = compiler.compile(ast);
        
        if (!fs.existsSync('dist')) {
            fs.mkdirSync('dist');
        }

        const outFile = path.join('dist', 'index.html');
        fs.writeFileSync(outFile, html);
        
        if (!quiet) console.log(`✓ Compiled ${inputFile} -> ${outFile}`);
    } catch (e: any) {
        console.error(`Compilation Failed: ${e.message}`);
        if (!quiet) process.exit(1);
    }
}

function serve() {
    const server = http.createServer((req, res) => {
        const filePath = path.join('dist', req.url === '/' ? 'index.html' : req.url!.substring(1));
        
        // Simple mime types
        const ext = path.extname(filePath);
        const mime = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css'
        }[ext] || 'text/plain';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end("Not Found");
            } else {
                res.writeHead(200, { 'Content-Type': mime });
                res.end(content);
            }
        });
    });

    server.listen(3000, () => {
        console.log('Server running at http://localhost:3000');
    });
}

function dev(inputFile: string) {
    console.clear();
    console.log(`Starting BitX Dev Server...`);
    
    // Initial build
    build(inputFile);
    
    // Start server
    serve();
    
    // Watch
    console.log(`Watching ${inputFile} for changes...`);
    fs.watchFile(inputFile, { interval: 500 }, () => {
        console.log(`File changed. Rebuilding...`);
        build(inputFile, true);
    });
}

switch (command) {
    case 'build':
        build(args[1] || 'main.bitx');
        break;
    case 'dev':
        dev(args[1] || 'main.bitx');
        break;
    case '--version':
    case '-v':
        console.log(`BitX v${VERSION}`);
        break;
    default:
        printHelp();
        break;
}
