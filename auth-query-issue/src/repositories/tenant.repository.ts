import { Getter, inject } from '@loopback/core';
import {

  HasManyRepositoryFactory,
  juggler,
  repository
} from '@loopback/repository';
import { DbDataSource } from '../datasources';

import {
  Client,
  IdentityProvider,
  Tenant,

} from '../models';

import {
  ClientRepository,
  IdentityProviderRepository,

} from './';
import { AuthCrudRepository } from './auth-crud-repository.repository';


export class TenantRepository extends AuthCrudRepository<
  Tenant,
  typeof Tenant.prototype.id
> {

  public readonly identityProviders: HasManyRepositoryFactory<
    IdentityProvider,
    typeof IdentityProvider.prototype.id
  >;
  public readonly clients: HasManyRepositoryFactory<
    Client,
    typeof Client.prototype.id
  >;


  constructor(
    @inject('datasources.db') dataSource: DbDataSource,


    @repository.getter('IdentityProviderRepository')
    getIdentityProviderRepository: Getter<IdentityProviderRepository>,

    @repository.getter('ClientRepository')
    getClientRepository: Getter<ClientRepository>,


  ) {
    super(Tenant, dataSource);



    this.clients = this.createHasManyRepositoryFactoryFor(
      'clients',
      getClientRepository
    );
    this.identityProviders = this.createHasManyRepositoryFactoryFor(
      'identityProviders',
      getIdentityProviderRepository
    );

    this.registerInclusionResolver('clients', this.clients.inclusionResolver);

    this.registerInclusionResolver(
      'identityProviders',
      this.identityProviders.inclusionResolver
    );
  }

}
