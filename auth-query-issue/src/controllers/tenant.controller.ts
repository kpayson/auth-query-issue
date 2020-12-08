import { Filter, repository } from '@loopback/repository';
import {
  get,
  param,

} from '@loopback/rest';

// import { inject } from '@loopback/core';
import { Tenant } from '../models';
import {
  TenantRepository
} from '../repositories';
import {
  TenantAllDataService,

} from '../services';


export class TenantController {
  constructor(

    @repository(TenantRepository)
    public tenantRepository: TenantRepository,
    // @inject(TenantBindings.TENANT_CREATION_SERVICE)
    // private tenantCreationService: TenantCreationService,
    // @inject(TenantBindings.TENANT_ALL_DATA_SERVICE)
    // private tenantAllDataService: TenantAllDataService,

  ) {}

  @get('/auth/admin/tenants', {
    responses: {
      200: {
        description: 'Array of Tenant model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Tenant } }
          }
        }
      }
    }
  })
  public async find(
    @param.filter(Tenant)
    filter?: Filter<Tenant>
  ): Promise<Tenant[]> {

    return this.tenantRepository.find(filter);
    //return this.userRepository.tenants(this.request.user.sub).find(filter);
  }

  @get('/auth/admin/tenants/{tenantId}/export', {
    responses: {
      200: {
        description: 'All data relating to a tenant',
        content: { 'application/json': { schema: { 'x-ts-type': Tenant } } }
      }
    }
  })
  public async exportTenantData(
    @param.path.number('tenantId') tenantId: number
  ): Promise<any> {

    const inclusions = [
      {
        relation: 'clients',
        scope: {
          include: [
            {
              relation: 'providers',
              scope: {
                fields: { id: true }
              }
            },

          ]
        }
      },
    ];

    const filter = { include: inclusions };
    return this.tenantRepository.findById(tenantId, filter);
  }

  // @post('/auth/admin/tenants/import', {
  //   responses: {
  //     200: {
  //       description: 'Tenant model with all dependencies'
  //     }
  //   }
  // })
  // public async importTenantData(
  //   @requestBody({
  //     required: true
  //   })
  //   allData: any
  // ): Promise<any> {
  //   const adminUserIds = [];
  //   for (const admin of settingsConfig['auth'].system.administrators || []) {
  //     const user = await this.userRepository.findOne({
  //       where: { email: admin.email }
  //     });
  //     adminUserIds.push(user.id);
  //   }

  //   const currentUserId = Number(this.request.user.sub);
  //   if (!adminUserIds.some((uid) => uid === currentUserId)) {
  //     adminUserIds.push(currentUserId);
  //   }
  //   return this.tenantCreationService.createAll(allData, adminUserIds);
  // }
}
