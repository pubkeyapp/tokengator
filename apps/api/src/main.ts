import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ApiCoreService, CORE_APP_STARTED } from '@tokengator/api-core-data-access'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { exec } from 'node:child_process'
import { AppModule } from './app/app.module'

patchBigintToJSON()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const core = app.get(ApiCoreService)
  app.enableCors(core.config.cors)
  app.setGlobalPrefix(core.config.prefix)
  app.use(cookieParser())
  app.use(
    session({
      secret: core.config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: !core.config.isDevelopment },
    }),
  )
  const host = `http://${core.config.host}:${core.config.port}`
  await app.listen(core.config.port, core.config.host)
  Logger.log(`🚀 RestAPI is running on: ${host}/${core.config.prefix}.`)
  Logger.log(`🚀 GraphQL is running on: ${host}/graphql.`)
  Logger.log(`🔋 API_URL: ${core.config.apiUrl}`)
  Logger.log(`🔋 WEB_URL: ${core.config.webUrl}`)
  Logger.log(`🔋 COOKIE_DOMAINS: ${core.config.cookieDomains.join(', ')}`)
  Logger.log(
    `🔋 CORS: ${
      core.config.corsBypass
        ? 'Bypassed'
        : core.config?.corsOrigins
        ? `enabled for: ${
            Array.isArray(core.config?.corsOrigins) ? core.config?.corsOrigins?.join(', ') : core.config?.corsOrigins
          }`
        : 'disabled'
    }`,
  )
  if (core.config.isDevelopment) {
    Logger.warn(`🐞 Application is running in development mode.`)
    exec('prettier --write ./api-schema.graphql ./api-swagger.json', { cwd: process.cwd() })
  }
  core.eventEmitter.emit(CORE_APP_STARTED)
}

bootstrap()

function patchBigintToJSON() {
  ;(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
    return this.toString()
  }
}
