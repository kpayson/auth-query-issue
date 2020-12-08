import { BindingKey } from '@loopback/core';
import { DbDataSource } from './datasources';


export namespace DataSourceBindings {
  export const DB_DATASOURCE = BindingKey.create<DbDataSource>(
    'datasources.db'
  );
  export const DB_DATASOURCE_CONFIG = BindingKey.create<object>(
    'datasources.config.db'
  );
}

