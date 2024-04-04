import { Injectable } from '@nestjs/common'
import { ApiPresetDataAdminService } from './api-preset-data-admin.service'
import { ApiPresetDataUserService } from './api-preset-data-user.service'
import { ApiPresetDataService } from './api-preset-data.service'

@Injectable()
export class ApiPresetService {
  constructor(
    readonly data: ApiPresetDataService,
    readonly admin: ApiPresetDataAdminService,
    readonly user: ApiPresetDataUserService,
  ) {}
}
