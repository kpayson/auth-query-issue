import { Getter, inject } from '@loopback/core';
import {
  repository,
  BelongsToAccessor,
  HasManyThroughRepositoryFactory
} from '@loopback/repository';

import {
  IdentityProviderRepository,
  ClientIdentityProviderRepository,
  TenantRepository
} from '.';
import { DbDataSource } from '../datasources';
import {
  Client,
  ClientIdentityProvider,
  IdentityProvider,
  Tenant,
} from '../models';
import { AuthCrudRepository } from './auth-crud-repository.repository';


export class ClientRepository extends AuthCrudRepository<
  Client,
  typeof Client.prototype.id
> {
  public readonly tenant: BelongsToAccessor<
    Tenant,
    typeof Client.prototype.tenantId
  >;


  public readonly providers: HasManyThroughRepositoryFactory<
    IdentityProvider,
    typeof IdentityProvider.prototype.id,
    ClientIdentityProvider,
    typeof Client.prototype.id
  >;


  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('IdentityProviderRepository')
    getIdentityProviderRepository: Getter<IdentityProviderRepository>,
    @repository.getter('TenantRepository')
    getTenantRepository: Getter<TenantRepository>,
    @repository.getter('ClientIdentityProviderRepository')
    getClientIdentityProviderRepository: Getter<
      ClientIdentityProviderRepository
    >,

  ) {
    super(Client, dataSource);

    this.tenant = this.createBelongsToAccessorFor(
      'tenant',
      getTenantRepository
    );


    this.providers = this.createHasManyThroughRepositoryFactoryFor(
      'providers',
      getIdentityProviderRepository,
      getClientIdentityProviderRepository
    );

    this.registerInclusionResolver(
      'providers',
      this.providers.inclusionResolver
    );


  }

}
