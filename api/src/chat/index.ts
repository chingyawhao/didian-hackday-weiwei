import * as KoaRouter from 'koa-router'
import { graphql } from 'graphql'

import root from './root'
import toDoSchema from './schema'

export default (router: KoaRouter) => {
  router.all('/chat', async (context, next) => {
    context.body = await graphql(
      toDoSchema,
      context.request.body as string,
      root
    )
    next()
  })
}
