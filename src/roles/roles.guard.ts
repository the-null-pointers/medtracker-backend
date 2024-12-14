import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import responseHelper from 'src/helper/response-helper';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = (
      user: { roles: { name: string }[] },
      requiredRoles: string[],
    ): boolean => {
      const userRoles = user.roles.map((role) => role.name);
      console.log('userRoles', userRoles);
      console.log(requiredRoles, 'requiredRoles');
      const hasRoles = requiredRoles.some((role) => userRoles.includes(role));
      console.log(hasRoles, 'hasRoles');
      return hasRoles;
    };
   
    if (!user || !hasRole(user, requiredRoles)) {
      throw new ForbiddenException(
        responseHelper.error('You do not have permission to access'),
      );
    }
    return true;
  }
}
