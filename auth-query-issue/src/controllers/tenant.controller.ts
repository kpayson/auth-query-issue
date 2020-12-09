import { Filter, repository } from '@loopback/repository';
import {
  get,
  param,

} from '@loopback/rest';

import {omit} from 'lodash';

import { Tenant } from '../models';
import {
  TenantRepository,
  ClientRepository,
  ClientIdentityProviderRepository,
  IdentityProviderRepository
} from '../repositories';


export class TenantController {
  constructor(

    @repository(TenantRepository)
    public tenantRepository: TenantRepository,
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
    @repository(IdentityProviderRepository)
    public identityProviderRepository: IdentityProviderRepository,
    @repository(ClientIdentityProviderRepository)
    public clientIdentityProviderRepository: ClientIdentityProviderRepository,


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
  public async find(): Promise<Tenant[]> {
    return this.tenantRepository.find();
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

  @get('/auth/admin/tenants/{tenantId}/inMemoryDB', {
    responses: {
      200: {
        description: 'export json for in memory db',
        content: { 'application/json': { schema: { 'x-ts-type': Tenant } } }
      }
    }
  })
  public async inMemoryDB(
    @param.path.number('tenantId') tenantId: number
  ): Promise<any> {

    const toInMemoryFormat = (dataArray:any[]) => {
      const escape =  (v:any) => JSON.stringify(v).replace(/\"/g,"\\\"");

      const inMemoryData =
        dataArray.reduce((db,v,i)=>({...db,[i]:escape(v)}),{});
      return inMemoryData;
    }
// scope:{fields:{id:true,title:true,tenantId:true}}
    // const tenantFilter = {where:{id:tenantId}} as Filter<Tenant>;
    const tenants = await this.tenantRepository.find();
    const inMemoryTenants = toInMemoryFormat(tenants);

    const clientFilter = {where:{tenantId},
      scope:{
        fields:{id:true,clientId:true,name:true},
        include:[ {
          relation: 'providers',
          scope: {fields:{id:true, clientId:true, identityProviderId:true}}
        }
    ]}};
    const clientsWithProviders = await this.clientRepository.find(clientFilter);
    const clients = clientsWithProviders.map(x=>omit(x,['providers']));
    const clientProviders = clientsWithProviders.flatMap(x=> x.providers);

    const inMemoryClients = toInMemoryFormat(clients);
    const inMemoryClientProviders = toInMemoryFormat(clientProviders);

    const identityProvidersFilter = {where:{tenantId},scope:{fields:{id:true,name:true,tenantId:true}}};
    const identityProviders = await this.identityProviderRepository.find(identityProvidersFilter);
    const inMemoryIdentityProviders = toInMemoryFormat(identityProviders);

    const db = {
      ids: {
        Tenant: tenants.length + 1,
        Client: clients.length + 1,
        IdentityProvider: identityProviders.length+1,
        ClientIdentityProvider: clientProviders.length+1
      },
      models: {
        Tenant: inMemoryTenants,
        Client: inMemoryClients,
        IdentityProvider: inMemoryIdentityProviders,
        ClientIdentityProvider: inMemoryClientProviders
      }
    }

    const fs = require('fs');
    fs.writeFile('~/inMemDB.json', JSON.stringify(db), (err: any) => {
        console.log(err);
    });

    return "success";
  }




}
