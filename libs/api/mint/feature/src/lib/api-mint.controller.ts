import { Controller, Get, Param, Res } from '@nestjs/common'
import { ApiMintService } from '@tokengator-mint/api-mint-data-access'
import { Response } from 'express-serve-static-core'

@Controller('mint')
export class ApiMintController {
  constructor(private readonly service: ApiMintService) {}

  @Get('uri/:address')
  async getMintUri(@Param('address') address: string) {
    return this.service.data.getMintUri(address)
  }

  @Get('image/:address')
  async getMintImage(@Res() res: Response, @Param('address') address: string) {
    return this.service.data.getMintImage(res, address)
  }

  @Get('metadata/:address')
  async getMintMetadata(@Param('address') address: string) {
    return this.service.data.getMintMetadata(address)
  }
}
