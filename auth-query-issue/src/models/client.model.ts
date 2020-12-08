import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property
} from '@loopback/repository';
import { CLIENT_TYPE, LOGIN_EVENT_TYPE } from '../enums';
import {

  Tenant,

} from '../models';

import { IdentityProvider } from './identity-provider.model';
import { ClientIdentityProvider } from './client-identity-provider.model';

@model({
  jsonSchema: {
  }
})
export class Client extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    id: 1
  })
  public id?: number;

  @property({
    type: 'string',
    defaultFn: 'uuidv4',
    length: 255,
    jsonSchema: {
      maxLength: 255
    }
  })
  public clientId?: string;

  @property({
    type: 'string',
    defaultFn: 'uuidv4',
    length: 255,
    jsonSchema: {
      maxLength: 255
    }
  })
  public clientSecret?: string;

  @property({
    type: 'string',
    length: 255,
    jsonSchema: {
      maxLength: 255
    }
  })
  public name?: string;

  @property({
    type: 'string',
    length: 1024,
    jsonSchema: {
      maxLength: 1024,
      nullable: true
    }
  })
  public description?: string;

  @property({
    type: 'string',
    length: 1024,
    jsonSchema: {
      maxLength: 1024,
      nullable: true
    }
  })
  public clientUri?: string;

  @property({
    type: 'object',
    required: true,
  })
  public config: {
    cert?: string;
    key?: string;
    callbackUrls?: string[];
    postLogoutRedirectUris?: string[];
    tokenEndpointAuthMethod?: string;
    responseTypes?: string[];
    grantTypes?: string[];
    jwks?: {
      keys: JsonWebKey[];
    };
    jwksUri?: string;
    logout?: {
      frontchannelLogout?: {
        enabled?: boolean;
      };
      showLogoutPrompt?: boolean;
    };
    adGroups?: string[];
    featureToggles?: {
      enableLegacyApplicationCompatibility: boolean;
    };
    scripts?: {
      checkAuthorization?: string;
      preMfa?: string;
    };
    [key: string]: any;
  };

  @property({
    type: 'object',
    jsonSchema: {
      additionalProperties: false,
      nullable: true,
      properties: {
        loginEventFilter: {
          type: 'array',
          items: {
            enum: Object.values(LOGIN_EVENT_TYPE)
          }
        }
      }
    }
  })
  public loginEventSettings: {
    loginEventFilter: LOGIN_EVENT_TYPE[];
  };

  @property({
    type: 'object',
    jsonSchema: {
      nullable: true
    }
  })
  public metadata?: Object;

  @belongsTo(
    () => Tenant,
    { keyTo: 'id' },
    {
      type: 'number',
      precision: 10,
      scale: 0
    }
  )
  public tenantId: number;

  @property({
    type: 'string',
    length: 255,
    jsonSchema: {
      enum: Object.values(CLIENT_TYPE)
    }
  })
  public type?: string;

  @property({
    type: 'date',
    readOnly: true
  })
  public createdOn?: Date;

  @property({
    type: 'string',
    length: 255,
    jsonSchema: {
      nullable: true
    }
  })
  public activeX509CertificateFingerprint?: string;



  @hasMany(() => IdentityProvider, {
    through: { model: () => ClientIdentityProvider }
  })
  public providers: IdentityProvider[];



  constructor(data?: Partial<Client>) {
    super(data);
  }
}

export interface ClientRelations {
  providers?: IdentityProvider[];
}

export type ClientWithRelations = Client & ClientRelations;
