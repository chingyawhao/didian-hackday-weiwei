import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import * as KoaCors from '@koa/cors'

import chat from './chat'

const app = new Koa()
const router = new KoaRouter()
app.use(KoaCors({}))

chat(router)

app.use(
  bodyParser({
    enableTypes: ['text'],
    extendTypes: {
      text: ['application/graphql'],
    },
  })
)
app.use(router.routes())

export default app
