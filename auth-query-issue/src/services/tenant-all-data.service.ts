import { repository } from '@loopback/repository';
import { Tenant } from '../models/tenant.model';
import { TenantRepository } from '../repositories';

export class TenantAllDataService {
  constructor(
    @repository(TenantRepository) private tenantRepository: TenantRepository
  ) {}

  async getAllTenantData(tenantId:number): Promise<Tenant> {
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
            // {
            //   relation: 'groups',
            //   scope: {
            //     fields: { id: true },
            //     include: [
            //       // {
            //       //   relation: 'roles',
            //       //   scope: {
            //       //     fields: { id: true }
            //       //   }
            //       // },
            //       // {
            //       //   relation: 'users',
            //       //   scope: {
            //       //     fields: {
            //       //       id: true,
            //       //       email: true
            //       //     }
            //       //   }
            //       // }
            //     ]
            //   }
            // },
            // {
            //   relation: 'roles',
            //   scope: {
            //     include: [
            //       // {
            //       //   relation: 'permissions',
            //       //   scope: {
            //       //     fields: { id: true }
            //       //   }
            //       // }
            //     ]
            //   }
            // },
            // {
            //   relation: 'permissions'
            // },
            // {
            //   relation: 'samlIntegrations'
            // },
            // {
            //   relation: 'loginPages' //client login page
            // },
            // {
            //   relation: 'resourceServers',
            //   scope: { fields: { id: true } }
            // }
          ]
        }
      },

      // { relation: 'identityProviders' },
      // {
      //   relation: 'groups',
      //   include: [
      //     // {
      //     //   relation: 'roles',
      //     //   scope: {
      //     //     fields: { id: true }
      //     //   }
      //     // },
      //     // {
      //     //   relation: 'users',
      //     //   scope: {
      //     //     fields: { id: true }
      //     //   }
      //     // }
      //   ]
      // },
      // { relation: 'loginPages' }, //tenant login page
      // { relation: 'resourceServers' }
    ];

    const filter = { include: inclusions };
    return this.tenantRepository.findById(tenantId, filter);
  }
}
