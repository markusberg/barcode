import { join } from 'node:path'
import { readFileSync } from 'node:fs'

import cors from 'cors'
import compression from 'compression'
import express from 'express'
import type { Request, RequestHandler, Response } from 'express'
import morgan from 'morgan'

import { nodeEnv, APP_ROOT_DIR, env } from './env.js'
import { router as api } from './routes/index.js'

const app = express()

// view engine setup
app.set('views', join(APP_ROOT_DIR, 'backend', 'views'))
app.set('view engine', 'pug')

// Inform express.js that we're behind a proxy
app.set('trust proxy', 'uniquelocal')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Remove the x-powered-by header
app.disable('x-powered-by')
app.use(cors())
app.use(compression())

const isProduction = nodeEnv === 'production'

/**
 * Define routes
 */
const pathFrontendDist = join(APP_ROOT_DIR, 'frontend', 'dist', 'browser')
console.log(`Path to frontend dist:`, pathFrontendDist)
app.use(env.SERVER_PREFIX, express.static(pathFrontendDist, { index: false }))
app.use(`${env.SERVER_PREFIX}/api`, api)

app.get(
  /.*/,
  serveIndexHtml(join(pathFrontendDist, 'index.html'), env.SERVER_PREFIX),
)

/**
 * Middleware for serving the index.html with optional mangling of base href
 * if specified in .env
 * @param pathIndexHtml the full path to index.html
 * @param baseHref the base href that the app is served from
 * @returns
 */
function serveIndexHtml(
  pathIndexHtml: string,
  baseHref: string,
): RequestHandler {
  const cache = getIndexHtml(pathIndexHtml, baseHref)
  return (_req: Request, res: Response) => res.type('html').send(cache)
}

/**
 * Get the index.html file from the provided pathString, and mangle the
 * base href if serverPrefix is provided
 * @param pathIndexHtml the full path to index.html
 * @param baseHref the base href that the app is served from
 * @returns
 */
function getIndexHtml(pathIndexHtml: string, baseHref: string): string {
  const contentsIndexHtml = readFileSync(pathIndexHtml).toString()
  if (baseHref) {
    console.debug('need to mangle index.html')
    return contentsIndexHtml.replace(
      `<base href="/"`,
      `<base href="${baseHref}/"`,
    )
  }
  return contentsIndexHtml
}

export async function getApp() {
  return app
}

// no stacktraces leaked to user in production env
app.use((err: any, _req: any, res: any, _next: any) => {
  res.status(err.status || 500)

  const error = isProduction ? {} : err
  res.render('error', {
    message: err.message,
    error,
  })
})
