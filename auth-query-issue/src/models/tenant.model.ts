import { Entity, hasMany, model, property } from '@loopback/repository';
import {
  Client,
  IdentityProvider,

} from '.';


@model({
  settings: {
    hiddenProperties: ['secrets', 'emailSecrets']
  }
})
export class Tenant extends Entity {
  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    id: 1
  })
  public id?: number;

  @property({
    type: 'string',
    jsonSchema: {
      pattern: /\S+/.source,
      maxLength: 255
    },
    length: 255
  })
  public title: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 1024,
      nullable: true
    },
    default: '',
    length: 1024
  })
  public description?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 255,
      pattern: /^[a-zA-Z0-9-_]+$/.source
    },
    length: 255
  })
  public tenantId: string;

  @property({
    type: 'object',
    jsonSchema: {
      type: 'object',
      properties: {
        jwk: {
          type: 'object'
        },
        cookies: {
          type: 'object',
          properties: {
            keys: {
              type: 'array',
              uniqueItems: true,
              items: {
                type: 'string'
              }
            }
          }
        },
        certificates: {
          type: 'object',
          additionalProperties: false,
          properties: {
            x509: {
              type: 'array',
              additionalProperties: false,
              uniqueItems: true,
              items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                  cert: {
                    type: 'string'
                  },
                  key: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  public secrets: {
    jwk?: any;
    cookies?: {
      keys: string[];
    };
    certificates: {
      x509: {
        key: string;
        cert: string;
      }[];
    };
  };


  @property({
    type: 'string',
    length: 255,
    jsonSchema: {
      nullable: true
    }
  })
  public activeX509CertificateFingerprint?: string;

  @property({
    type: 'object',
    jsonSchema: {
      type: 'object',
      nullable: true,
      additionalProperties: false,
      required: ['from', 'transport'],
      properties: {
        from: {
          type: 'string'
        },
        transport: {
          type: 'object',
          additionalProperties: false,
          required: ['host', 'port', 'secure', 'tls'],
          properties: {
            host: {
              type: 'string'
            },
            port: {
              type: 'number'
            },
            secure: {
              type: 'boolean'
            },
            tls: {
              type: 'object',
              additionalProperties: false,
              properties: {
                rejectUnauthorized: {
                  type: 'boolean'
                }
              }
            }
          }
        }
      }
    },
    default: () => ({})
  })
  public emailSettings?: {
    transport: any;
    from: string;
  };

  @property({
    type: 'object',
    jsonSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        user: {
          type: 'string'
        },
        pass: {
          type: 'string'
        }
      },
      required: ['user', 'pass']
    },
    default: () => ({})
  })
  public emailSecrets?: {
    user: string;
    pass: string;
  };

  @property({
    type: 'object',
    jsonSchema: {
      type: 'object',
      nullable: true,
      additionalProperties: false,
      properties: {
        idleSessionLifetime: {
          type: 'number',
          minimum: 0
        },
        sessionLifetime: {
          type: 'number',
          minimum: 0
        }
      }
    },
    default: () => ({})
  })
  public settings?: {
    idleSessionLifetime: number;
    sessionLifetime: number;
  };

  @property({
    type: 'object',
    jsonSchema: {
      type: 'object',
      nullable: true,
      properties: {
        loginEventFilter: {
          type: 'array',
          items: {
            enum: []
          }
        }
      }
    }
  })
  public loginEventSettings: {
    loginEventFilter: [];
  };

  @property({
    type: 'object',
    jsonSchema: {
      type: 'object',
      nullable: true,
      properties: {
        userAlertFilter: {
          type: 'array',
          items: {
            enum: []
          }
        }
      }
    }
  })
  public userAlertSettings: {
    userAlertFilter: [];
  };

  @property({
    type: 'object',
    jsonSchema: {
      nullable: true,
      properties: {
        image: {
          type: 'string',
          pattern: /^data:image\/([a-zA-Z]*);base64,([^"]*)$/.source
        },
        backgroundColor: {
          type: 'string',
          pattern: /^(.*)$/.source
        }
      }
    }
  })
  public tileConfig?: {
    image?: string;
    backgroundColor?: string;
  };

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 4096,
      pattern: /\S+/.source,
      nullable: true
    },
    length: 4096
  })
  public notification?: string;

  @property({
    type: 'number'
  })
  public createdByUserId?: number;

  @property({
    type: 'number'
  })
  public ownerUserId?: number;

  @property({
    type: 'date',
    defaultFn: 'now'
  })
  public createdAt?: Date;

  @property({
    type: 'date',
    defaultFn: 'now'
  })
  public updatedAt?: Date;

  @hasMany(() => Client)
  public clients?: Client[];

  @hasMany(() => IdentityProvider)
  public identityProviders?: IdentityProvider[];


  constructor(data?: Partial<Tenant>) {
    super(data);
  }
}
