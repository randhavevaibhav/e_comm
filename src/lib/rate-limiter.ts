import Redis from 'ioredis';
import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterRedis } from 'rate-limiter-flexible';


const redisClient = new Redis({
  host: process.env.REDIS_HOST, 
  port: parseInt(process.env.REDIS_PORT),                   
  password: process.env.REDIS_PASSWORD,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,           // Number of requests
  duration: 60,      //in sec
});



type Handler = (req: NextRequest, ...args: any[]) => Promise<NextResponse>;

export function withRateLimit(handler: Handler) {
  return async (req: NextRequest, ...args: any[]) => {
    // Extract IP address
    //Getting the client IP from x-forwarded-for header which is injected by 
    // vercel proxy server
    //Flow - client browser ==> Vercel proxy (where it inject x-forwarded-for header) ==> vercel server where code is deployed.
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
      await rateLimiter.consume(ip);
      return await handler(req, ...args);
  };
}