import { join } from 'node:path'
import { readFileSync } from 'node:fs'

import cors from 'cors'
import compression from 'compression'
import express, { Request, Response } from 'express'
import morgan from 'morgan'

import { nodeEnv, APP_ROOT_DIR, env } from './env'
import { router as api } from './routes'

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

// error handlers
if (nodeEnv === 'production') {
  // production error handler
  // no stacktraces leaked to user
  app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: {},
    })
  })
} else {
  // development error handler
  // will print stacktrace
  app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err,
    })
  })
}

/**
 * Define routes
 */
const pathFrontendDist = join(APP_ROOT_DIR, 'frontend', 'dist')
console.log(`Path to frontend dist:`, pathFrontendDist)
app.use(env.SERVER_PREFIX, express.static(pathFrontendDist, { index: false }))
app.use(`${env.SERVER_PREFIX}/api`, api)
app.get('*', indexHtmlFallback(pathFrontendDist))

/**
 * Middleware for serving the index.html with optional mangling of base href
 * if specified in .env
 * @param pathFrontendDist
 * @returns
 */
function indexHtmlFallback(pathFrontendDist: string) {
  const cache = getIndexHtml(join(pathFrontendDist, 'index.html'))

  return (_req: Request, res: Response) => res.type('html').send(cache)
}

/**
 * Get the index.html file from the provided pathString, and mangle the
 * base href if env.SERVER_PREFIX contains a value
 * @param pathIndexHtml
 * @returns
 */
function getIndexHtml(pathIndexHtml: string) {
  const indexHtml = readFileSync(pathIndexHtml).toString()
  if (env.SERVER_PREFIX === '') {
    return indexHtml
  }

  console.debug('need to mangle index.html')
  return indexHtml.replace(
    `<base href="/"`,
    `<base href="${env.SERVER_PREFIX}/"`,
  )
}

export async function getApp() {
  return app
}
