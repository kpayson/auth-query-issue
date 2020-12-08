import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import config from './db.datasource.json';
import { DataSourceBindings } from '../keys';

export class DbDataSource extends juggler.DataSource {
  public static dataSourceName = 'db';

  constructor(
    @inject(DataSourceBindings.DB_DATASOURCE_CONFIG)
    dsConfig: object = config
  ) {
    super(dsConfig);
  }
}
