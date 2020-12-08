import { inject } from '@loopback/core';
import { IdentityProviderRepository } from '.';
import { DbDataSource } from '../datasources';
import { ClientIdentityProvider } from '../models';
import { DefaultCrudRepository } from '@loopback/repository';


import { repository } from '@loopback/repository';

export class ClientIdentityProviderRepository extends DefaultCrudRepository<ClientIdentityProvider, typeof ClientIdentityProvider.prototype.id>
  {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository(IdentityProviderRepository)
    public identityProviderRepository: IdentityProviderRepository,

  ) {
    super(ClientIdentityProvider, dataSource);
  }
}
