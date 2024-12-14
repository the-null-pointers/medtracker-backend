import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  EmailRegisterDto,
  RegisterDto,
  UpdateUserDto,
  VerfiyEmailRegisterDto,
  VerfiyRegisterDto,
} from './dto/create-auth.dto';
import { ApiBearerAuth, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/current-user/current-user.decorator';
import { AuthGuard } from './auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('register')
  // create(@Body() registerDto: RegisterDto) {
  //   return this.authService.register(registerDto);
  // }
  // @Post('verify-register')
  // verifyRegister(@Body() verifyRegisterDto: VerfiyRegisterDto) {
  //   return this.authService.verifyRegister(verifyRegisterDto);
  // }
  @Post()
  auth(@Body() registerDto: RegisterDto) {
    return this.authService.auth(registerDto);
  }
  @Post('verify')
  verify(@Body() verifyRegisterDto: VerfiyRegisterDto) {
    return this.authService.authVerify(verifyRegisterDto);
  }
  @Post('email')
  emailAuth(@Body() registerDto: EmailRegisterDto) {
    return this.authService.emailAuth(registerDto);
  }
  @Post('email-verify')
  emailAuthVerify(@Body() verifyRegisterDto: VerfiyEmailRegisterDto) {
    return this.authService.emailAuthVerify(verifyRegisterDto);
  }
  @ApiProperty()
  @UseGuards(AuthGuard)
  @Post('update-user')
    @ApiBearerAuth()
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.authService.updateUser(user.id, updateUserDto);
  }
}
