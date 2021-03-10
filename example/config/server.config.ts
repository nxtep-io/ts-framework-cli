import { Logger, SentryTransport } from 'nano-errors';

// Prepare server port
const port = process.env.PORT as any || 3000;


// Prepare global logger instance
const sentry = process.env.SENTRY_DSN ? { dsn: process.env.SENTRY_DSN } : undefined;
const logger = Logger.initialize({ transports: sentry ? [new SentryTransport(sentry)] : [] });

export default {
  logger,
  sentry,
  port,
}