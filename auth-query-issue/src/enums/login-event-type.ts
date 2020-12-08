/**
 * @description The login event types supported by LabShare Auth
 */
export enum LOGIN_EVENT_TYPE {
  LOGIN = 'login',
  FAILED_LOGIN = 'failed-login',
  LOGOUT = 'logout',
  FAILED_LOGOUT = 'failed-logout',
  ACCESS_TOKEN_DESTROYED = 'at-del',
  ACCESS_TOKEN_CREATED = 'at-created',
  CLIENT_CRED_TOKEN_DESTROYED = 'cct-del',
  CLIENT_CRED_TOKEN_CREATED = 'cct-created',
  REFRESH_TOKEN_DESTROYED = 'rt-del',
  REFRESH_TOKEN_CREATED = 'rt-created',
  REFRESH_TOKEN_CONSUMED = 'rt-consumed',
  TOTP_VALIDATED = 'totp-validated',
  TOTP_CREATED = 'totp-created',
  TOTP_FAILED = 'totp-failed',
  TOTP_TRUSTED_DEVICE_CREATED = 'totp-trusted-device-created',
  TOTP_SUSPENDED = 'totp-suspended'
}
