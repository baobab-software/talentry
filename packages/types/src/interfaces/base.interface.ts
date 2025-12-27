export interface JsonObject {
  [key: string]: any;
}

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseAudit {
  ipAddress?: string;
  userAgent?: string;
  metadata?: JsonObject;
  createdAt: Date;
}