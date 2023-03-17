import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(public userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log({ token });
    next();
  }
}
