import {
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Observable } from 'rxjs';
  import { Injectable } from '@nestjs/common/decorators';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from './roles.auth.decorator';
  import { HttpStatus } from '@nestjs/common';
  import { HttpException } from '@nestjs/common/exceptions';
  
  @Injectable()
  export class MyselfGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
    canActivate(
      context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();
      try {
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
        if (!requiredRoles) {
          return true;
        }

        
        
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        
      
        

        if (bearer !== 'Bearer' || !token) {
          throw new UnauthorizedException({
            message: 'Пользователь не авторизован',
          });
        }
  
        const user = this.jwtService.verify(token);
  

        req.user = user;
  
        
        if (req.body.user_id == user.user_id  || req.params.id == user.user_id ) {
            return true; 
        }

        return user.role.some((role) => requiredRoles.includes(role));
      } catch (err) {
        console.log(err);
  
        throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN);
      }
    }
  }
  