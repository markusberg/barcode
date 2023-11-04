import { createServer } from 'node:http'

import { env } from './env.js'
import { getApp } from './app.js'

const port = env.PORT

getApp().then((app) => {
  app.set('port', port)
  const server = createServer(app)
  server.listen(port, '0.0.0.0')
  server.on('error', onError)
  server.on('listening', () => {
    const addr = server.address()
    const bind =
      typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`
    console.log(`Listening on ${bind}`)
  })
})

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}
