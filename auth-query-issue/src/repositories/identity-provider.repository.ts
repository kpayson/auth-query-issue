import { inject, Getter } from '@loopback/core';
import { DbDataSource } from '../datasources';
import {
  IdentityProvider,
  Tenant
} from '../models';
import { DefaultCrudRepository } from '@loopback/repository';
import {
  repository,
  BelongsToAccessor
} from '@loopback/repository';

import { TenantRepository} from '.';



export class IdentityProviderRepository extends DefaultCrudRepository<
  IdentityProvider,
  typeof IdentityProvider.prototype.id
> {

  public readonly tenant: BelongsToAccessor<
    Tenant,
    typeof IdentityProvider.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,

    @repository.getter('TenantRepository')
    getTenantRepository: Getter<TenantRepository>,

  ) {
    super(IdentityProvider, dataSource);

    this.tenant = this.createBelongsToAccessorFor(
      'tenant',
      getTenantRepository
    );

    this.registerInclusionResolver('tenant', this.tenant.inclusionResolver);

  }

}
