import { existsSync, readFileSync } from 'node:fs'

export interface KeyValue {
  [key: string]: string
}

/**
 * Load file from disk and parse into KeyValue object
 * @param path the path to the file
 * @returns
 */
export function loadAndParse(path: string): KeyValue {
  if (!existsSync(path)) {
    throw new Error(`key-value file doesn't exist: ${path}`)
  }
  const file = readFileSync(path).toString()
  return parse(file)
}

/**
 * This function is inspired by dotenv
 * @param src
 * @returns
 */
export function parse(src: string): KeyValue {
  const obj: KeyValue = {}
  const rxKeyValue =
    /^\s*([\w.-]+)\s*=\s*('(?:\\'|[^'])*'|"(?:\\"|[^"])*"|`(?:\\`|[^`])*`|[^#\n]+)?\s*(?:#.*)?$/gm

  // Normalize line breaks
  const lines = src.replace(/\r\n?/gm, '\n')

  let match
  while ((match = rxKeyValue.exec(lines)) !== null) {
    const key = match[1]
    const value = (match[2] || '').trim()

    // Strip surrounding quotes while preserving whitespace within quotes
    obj[key] = value.replace(/^(['"`])([\s\S]*)\1$/g, '$2')
  }

  return obj
}
