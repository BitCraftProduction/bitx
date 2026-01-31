
export const RuntimeComponents: Record<string, (args: string[], children: string) => string> = {
  App: (_, children) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BitX App</title>
  <style>
    body { margin: 0; font-family: system-ui, sans-serif; }
    * { box-sizing: border-box; }
  </style>
</head>
<body>
  ${children}
</body>
</html>`,

  Page: (_, children) => `<main style="min-height: 100vh; display: flex; flex-direction: column;">${children}</main>`,

  Column: (_, children) => `<div style="display: flex; flex-direction: column; gap: 1rem; width: 100%;">${children}</div>`,

  Row: (_, children) => `<div style="display: flex; flex-direction: row; gap: 1rem; align-items: center;">${children}</div>`,

  Text: (args) => `<p style="margin: 0;">${args[0] || ''}</p>`,

  Button: (args) => `<button style="padding: 0.5rem 1rem; cursor: pointer;">${args[0] || 'Button'}</button>`,
  
  // Extra utility
  Link: (args) => `<a href="${args[1] || '#'}" style="color: blue; text-decoration: underline;">${args[0] || 'Link'}</a>`
};
