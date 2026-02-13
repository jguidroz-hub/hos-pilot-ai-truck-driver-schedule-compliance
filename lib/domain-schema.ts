import { pgTable, text, timestamp, boolean, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './schema';

// Per-user preferences and settings
export const userSettings = pgTable('user_settings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  timezone: text('timezone').default('UTC'),
  emailNotifications: boolean('email_notifications').default(true),
  weeklyDigest: boolean('weekly_digest').default(true),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
  updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
});

// Tracks important state changes for debugging and compliance
export const auditLog = pgTable('audit_log', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id'),
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
});

// Track individual driver Hours of Service (HOS) records
export const driverLogs = pgTable('driver_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  totalDriveHours: text('total_drive_hours').notNull(),
  sleeperBerthSplits: jsonb('sleeper_berth_splits').notNull(),
  complianceStatus: text('compliance_status').notNull(),
  vehicleId: text('vehicle_id').references(() => vehicles.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

// Truck/vehicle information for HOS tracking
export const vehicles = pgTable('vehicles', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  vin: text('vin').unique(),
  licensePlate: text('license_plate').notNull(),
  make: text('make').notNull(),
  model: text('model').notNull(),
  year: integer('year').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});
