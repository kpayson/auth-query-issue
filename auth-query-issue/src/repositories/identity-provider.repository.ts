import { inject, Getter } from '@loopback/core';
import { DbDataSource } from '../datasources';
import {
  IdentityProvider,
  Tenant
} from '../models';
import { AuthCrudRepository } from './auth-crud-repository.repository';
import {
  repository,
  BelongsToAccessor
} from '@loopback/repository';

import {

  TenantRepository
} from '.';



export class IdentityProviderRepository extends AuthCrudRepository<
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



  /**
   * @description Gets the issuer URI based on the IdP type. The issuer is used to uniquely
   * identify a user using a combination of their email and the issuer.
   */




}
