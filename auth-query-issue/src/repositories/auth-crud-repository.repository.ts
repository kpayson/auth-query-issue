import {
  DefaultCrudRepository,
  Entity,
  juggler,
  Where
} from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';

export class AuthCrudRepository<
  T extends Entity,
  ID
> extends DefaultCrudRepository<T, ID> {

  constructor(
    entityClass: typeof Entity & {
      prototype: T;
    },
    dataSource: juggler.DataSource
  ) {
    super(entityClass, dataSource);
  }

  public async upsertWithWhere(where: Where<T>, model: T): Promise<T> {
    const existingEntities = await this.find({ where });

    if (existingEntities.length > 1) {
      throw new HttpErrors.InternalServerError(
        'Upsert tried to update more than one entity'
      );
    }

    const existing = existingEntities[0];

    if (existing) {
      await this.updateById(existing.getId(), model);
      return this.findById(existing.getId());
    } else {
      return this.create(model);
    }
  }
}
