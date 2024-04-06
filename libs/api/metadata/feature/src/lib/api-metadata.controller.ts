import { Controller, Get, Param, Res } from '@nestjs/common'
import { ApiMetadataService } from '@tokengator/api-metadata-data-access'
import { Response } from 'express-serve-static-core'

@Controller('metadata')
export class ApiMetadataController {
  constructor(private readonly service: ApiMetadataService) {}

  @Get('image/:account')
  async image(@Param('account') account: string, @Res() res: Response) {
    const imageUrl = await this.service.getImage(account)

    return res.redirect(imageUrl)
  }

  @Get('json/:account')
  async json(@Param('account') account: string) {
    return this.service.getJson(account)
  }
}
