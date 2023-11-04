import { dirname, join, resolve } from 'node:path'
import { z } from 'zod'
import { NodeEnv, NodeEnvSchema } from './interfaces/node-env.js'
import { loadAndParse } from './env-parser.js'
import { fileURLToPath } from 'node:url'

const stringToInt = z.string().transform((val) => parseInt(val))
const EnvSchema = z.object({
  PORT: stringToInt.default('3110'),
  SERVER_PREFIX: z.string().default(''),
})

let env: z.infer<typeof EnvSchema>
let nodeEnv: NodeEnv

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const APP_ROOT_DIR = join(__dirname, '..', '..')

try {
  const pathToEnv = resolve(APP_ROOT_DIR, '.env')
  const parsed = loadAndParse(pathToEnv)
  env = EnvSchema.parse(parsed)
  nodeEnv = NodeEnvSchema.parse(process.env.NODE_ENV)
} catch (error) {
  console.error(".env file doesn't validate")
  console.log(error)
  process.exit()
}

// Ignore all self-signed certificates in development environment
if (nodeEnv === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

export { env, nodeEnv, APP_ROOT_DIR }
