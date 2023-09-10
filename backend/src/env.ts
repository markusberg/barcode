/**
 * Loading of .env file, and validation of environment prior to starting
 */

import { join, resolve } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { z } from 'zod'
import dotenv from 'dotenv'
import { NodeEnv, NodeEnvSchema } from './interfaces/node-env'

const APP_ROOT_DIR = join(__dirname, '..', '..')
const pathToEnv = resolve(APP_ROOT_DIR, '.env')
let file: string

console.log(`APP_ROOT_DIR: ${APP_ROOT_DIR}`)

try {
  if (!existsSync(pathToEnv)) {
    console.log(".env file doesn't exist: ", pathToEnv)
    process.exit()
  }
  file = readFileSync(pathToEnv).toString()
} catch (err) {
  console.log('unknown error')
  console.log(err)
  process.exit()
}

const parsed = dotenv.parse(file)

const stringToInt = z.string().transform((val) => parseInt(val))
// const stringToBoolean = z.string().transform((val) => validator.isBoolean(val))
const envSchema = z.object({
  PORT: stringToInt.default('3110'),
  SERVER_PREFIX: z.string().default(''),
})

let env: z.infer<typeof envSchema>
let nodeEnv: NodeEnv

try {
  env = envSchema.parse(parsed)
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
