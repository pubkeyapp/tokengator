import { Controller, Get, Param } from '@nestjs/common'
import { ApiMintService } from '@tokengator-mint/api-mint-data-access'

@Controller('mint')
export class ApiMintController {
  constructor(private readonly service: ApiMintService) {}

  @Get('uri/:address')
  getMintUri(@Param('address') address: string) {
    return this.service.data.getMintUri(address)
  }

  @Get('image/:address')
  getMintImage(@Param('address') address: string) {
    return this.service.data.getMintImage(address)
  }

  @Get('metadata/:address')
  getMintMetadata(@Param('address') address: string) {
    return this.service.data.getMintMetadata(address)
  }
}
