'use strict';

/**
 * @exports Authorization error types
 */

export enum AUTHORIZATION_ERROR {
  ACCESS_DENIED = 'access_denied',
  INVALID_PROTOCOL = 'invalid_auth_protocol',
  INVALID_RESPONSE_TYPE = 'invalid_response_type',
  SERVER_ERROR = 'unexpected_error',
  INVALID_GRANT_TYPE = 'invalid_grant_type'
}
