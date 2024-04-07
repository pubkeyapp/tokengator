import { Controller, Get, Param, Res } from '@nestjs/common'
import { ApiMetadataService } from '@tokengator/api-metadata-data-access'
import { Response } from 'express-serve-static-core'

@Controller('metadata')
export class ApiMetadataController {
  constructor(private readonly service: ApiMetadataService) {}

  @Get('image/:account')
  async image(@Param('account') account: string, @Res() res: Response) {
    const result = await this.service.getImage(account)

    if (!result) {
      return res.status(404).send('Not found')
    }

    if (typeof result === 'string') {
      return res.redirect(result)
    }

    // set headers
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 'no-store no-cache must-revalidate private max-age=0 s-maxage=0 proxy-revalidate')

    // send pubkey-profile
    res.send(result)
    //
    // res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': result.length })
    // res.end(result)
  }

  @Get('json/:account')
  async json(@Param('account') account: string) {
    return this.service.getJson(account)
  }

  @Get('redirect/:account')
  async redirect(@Param('account') account: string, @Res() res: Response) {
    const url = await this.service.getRedirect(account)

    res.redirect(url)
  }
}
