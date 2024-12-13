import { Injectable, NestMiddleware } from '@nestjs/common';
import * as express from 'express';
@Injectable()
export class MiddlewareMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    express.json({ limit: '50mb' })(req, res, next);
    // next();
  }
}
