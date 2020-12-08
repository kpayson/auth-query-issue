import { Entity, model, property } from '@loopback/repository';

@model({})
export class ClientIdentityProvider extends Entity {
  @property({
    type: 'string',
    length: 32,
    jsonSchema: {
    }
  })
  public mfaType?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0
  })
  public sortOrder?: number;

  @property({
    type: 'number',
    id: 1,
    precision: 10,
    scale: 0
  })
  public id?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0
  })
  public clientId?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0
  })
  public identityProviderId?: number;

  @property({
    type: 'boolean',
    jsonSchema: { nullable: true }
  })
  public verifyEmail?: boolean;

  constructor(data?: Partial<ClientIdentityProvider>) {
    super(data);
  }
}
