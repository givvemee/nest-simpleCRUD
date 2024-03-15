import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  //UseGaurd : 인증 미들웨어
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}

/**
 *
 * 침고 : 미들웨어가 불러지는 순서
 * 미들웨어 -> 가드 -> 인터셉터 -> 파이프 -> 컨트롤러 -> 서비스 -> 컨트롤러 -> 인터셉터 -> 필터 -> 클라이언트
 */
