import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;

  if (!user)
    throw new InternalServerErrorException('User not found in request');

  // If we receive a property we only return that value. If not return thw whole user
  return !data ? user : user[data];
});
