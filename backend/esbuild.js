/**
 * https://github.com/evanw/esbuild/issues/1921
 */

import esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/www.ts'],
  outfile: 'dist/www.mjs',
  platform: 'node',
  target: 'node18',
  bundle: true,
  sourcemap: true,
  format: 'esm',
  banner: {
    js: `
// BANNER START
const require = (await import("node:module")).createRequire(import.meta.url);
const __filename = (await import("node:url")).fileURLToPath(import.meta.url);
const __dirname = (await import("node:path")).dirname(__filename);
// BANNER END
`,
  },
})
