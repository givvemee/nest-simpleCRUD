import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '숫자와 영문자만 사용하여 비밀번호를 만들어 주세요.',
  })
  password: string;
}
