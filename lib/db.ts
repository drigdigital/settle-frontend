import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var __mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.__mongooseCache ?? { conn: null, promise: null };
global.__mongooseCache = cache;

/**
 * Cached Mongoose connection singleton (required in Next.js — every route
 * handler invocation would otherwise open a new connection). Returns null
 * when MONGODB_URI is unset so local/dev pages can fall back to placeholder
 * data instead of crashing.
 */
export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) return null;

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
