import {
  belongsTo,
  Entity,
  model,
  property,
  hasMany,
  Model
} from '@loopback/repository';

import { Tenant, } from '../models';
import { LOGIN_EVENT_TYPE } from '../enums';

@model()
class UserAlertSettings extends Model {
  @property.array('string', {
    jsonSchema: {
      enum: Object.values(LOGIN_EVENT_TYPE)
    }
  })
  public userAlertFilter?: LOGIN_EVENT_TYPE[];
}

@model()
class TrustedDeviceSettings extends Model {
  @property({
    type: 'number'
  })
  public tokenLifetime?: number;
}

@model()
class MfaSettings extends Model {
  @property({
    type: TrustedDeviceSettings,
    jsonSchema: {
      nullable: true
    }
  })
  public trustedDeviceSettings?: TrustedDeviceSettings;
}

@model({
  settings: {
    hiddenProperties: ['secrets']
  }
})
export class IdentityProvider extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    id: 1
  })
  public id?: number;

  @property({
    type: 'string',
    length: 255,
    jsonSchema: { nullable: true }
  })
  public loginTooltip?: string;

  @property({
    type: 'string',
    length: 255
  })
  public name: string;

  @property({
    type: 'string',
    length: 255,
    jsonSchema: {
      nullable: true
    }
  })
  public displayName?: string;

  @belongsTo(
    () => Tenant,
    { keyTo: 'id' },
    {
      type: 'number',
      required: false,
      precision: 10,
      scale: 0
    }
  )
  public tenantId?: number;

  @property({
    type: 'object',
    jsonSchema: {
      nullable: true
    }
  })
  public config: {
    color?: string;
    logoutUri?: string;
    features?: {
      userDirectoryIntegration?: boolean;
      enablePassbolt?: boolean;
    };
  };

  @property({
    type: 'string',
    jsonSchema: {
      nullable: true
    }
  })
  public icon?: string;

  @property({
    type: 'string',
    length: 255,

  })
  public type?: string;

  @property({
    type: 'string',
    length: 255
  })
  public issuer?: string;

  @property({
    type: 'string',
    length: 32,

  })
  public mfaType?: string;

  @property({
    type: MfaSettings,
    jsonSchema: {
      nullable: true
    },
    default: {}
  })
  public mfaSettings?: MfaSettings;

  @property({
    type: UserAlertSettings,
    jsonSchema: {
      nullable: true
    },
    default: () => new UserAlertSettings()
  })
  public userAlertSettings?: UserAlertSettings;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    jsonSchema: {
      nullable: true
    }
  })
  public sortOrder?: number;

  @property({
    type: 'boolean',
    jsonSchema: { nullable: true }
  })
  public verifyEmail?: boolean;

  @property({
    type: 'object',
    jsonSchema: {
      nullable: true
    }
  })
  public secrets?: { [key: string]: any };



  constructor(data?: Partial<IdentityProvider>) {
    super(data);
  }
}
