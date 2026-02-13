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

// Truck drivers and their core profile information
export const drivers = pgTable('drivers', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  fullName: text('full_name').notNull(),
  licenseNumber: text('license_number').unique(),
  commercialLicenseExpiry: timestamp('commercial_license_expiry'),
  currentStatus: text('current_status').default('available'),
  totalDrivingHours: text('total_driving_hours').default(0),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

// Detailed HOS compliance tracking per trip
export const drivingLogs = pgTable('driving_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  driverId: text('driver_id').references(() => drivers.id, { onDelete: 'cascade' }),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time'),
  totalDriveTime: text('total_drive_time'),
  totalOnDutyTime: text('total_on_duty_time'),
  sleeperBerthTime: text('sleeper_berth_time'),
  complianceStatus: text('compliance_status').default('pending'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

// Trucks and fleet vehicles tracked for compliance
export const vehicles = pgTable('vehicles', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  vehicleIdentifier: text('vehicle_identifier').unique(),
  vin: text('vin').unique(),
  make: text('make'),
  model: text('model'),
  currentDriverId: text('current_driver_id').references(() => drivers.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});
