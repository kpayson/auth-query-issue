/**
 * @module The Authorization Scopes supported by the Auth REST API
 */

export const INTERNAL_SCOPES = [
  'USER_TRUSTED_DEVICES',
  'AUDIT_LOGS',
  'RESOURCE_SERVERS'
];

export const SCOPE = {
  AUDIT_LOGS: {
    LIST: 'auth.auditLogs.list'
  },
  USER_TRUSTED_DEVICES: {
    LIST: 'auth.userTrustedDevices.list',
    CREATE: 'auth.userTrustedDevices.create',
    DELETE: 'auth.userTrustedDevices.delete',
    UPDATE: 'auth.userTrustedDevices.update'
  },
  USERS: {
    LIST: 'auth.users.list',
    CREATE: 'auth.users.create',
    DELETE: 'auth.users.delete',
    UPDATE: 'auth.users.update'
  },
  TENANTS: {
    LIST: 'auth.tenants.list',
    CREATE: 'auth.tenants.create',
    DELETE: 'auth.tenants.delete',
    UPDATE: 'auth.tenants.update'
  },
  GROUPS: {
    LIST: 'auth.groups.list',
    CREATE: 'auth.groups.create',
    DELETE: 'auth.groups.delete',
    UPDATE: 'auth.groups.update'
  },
  PERMISSIONS: {
    LIST: 'auth.permissions.list',
    CREATE: 'auth.permissions.create',
    DELETE: 'auth.permissions.delete',
    UPDATE: 'auth.permissions.update'
  },
  ROLES: {
    LIST: 'auth.roles.list',
    CREATE: 'auth.roles.create',
    DELETE: 'auth.roles.delete',
    UPDATE: 'auth.roles.update'
  },
  CLIENTS: {
    LIST: 'auth.clients.list',
    CREATE: 'auth.clients.create',
    DELETE: 'auth.clients.delete',
    UPDATE: 'auth.clients.update'
  },
  IDENTITY_PROVIDERS: {
    LIST: 'auth.identityProviders.list',
    CREATE: 'auth.identityProviders.create',
    DELETE: 'auth.identityProviders.delete',
    UPDATE: 'auth.identityProviders.update'
  },
  RESOURCE_SERVERS: {
    LIST: 'auth.resourceServers.list',
    CREATE: 'auth.resourceServers.create',
    DELETE: 'auth.resourceServers.delete',
    UPDATE: 'auth.resourceServers.update'
  },
  EMAIL: {
    SEND: 'auth.send.email'
  },
  CERTIFICATES: {
    UPLOAD_OR_CREATE: 'auth.certificates.create'
  }
};
