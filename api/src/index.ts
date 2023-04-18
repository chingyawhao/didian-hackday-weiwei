import { Server, AddressInfo } from 'net'
import app from './app'

function startServer() {
  return new Promise((resolve, reject) => {
    const server = app.listen(parseInt(process.env.PORT) || 8080)

    server.once('listening', () => resolve(server))
    server.once('error', (error) => {
      reject(error)
    })
  }).then((server: Server) => {
    console.info(
      `Koa listening on port ${(server.address() as AddressInfo).port}`
    )

    if (module['hot']) {
      let currentApp = app.callback()
      module['hot'].accept('./app', () => {
        server.removeListener('request', currentApp)
        import('./app')
          .then(({ default: nextApp }) => {
            currentApp = nextApp.callback()
            server.on('request', currentApp)
            console.log('Koa reloaded')
          })
          .catch((error) => console.error(error))
      })

      module['hot'].accept((err) => console.error(err))
      module['hot'].dispose(() => server.close())
    }
  })
}

startServer().catch((error) => {
  console.error('Error in server start script', error)
})
