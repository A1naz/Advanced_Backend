import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class createUserDto {
  @IsString({ message: 'должно быть строкой' })
  @IsEmail({}, { message: 'некорректный email' })
  readonly email: string;
  @IsString({ message: 'должно быть строкой' })
  @Length(8, 32, { message: 'длина пароля должна быть от 8 до 32' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'ненадежный пароль',
  })
  readonly password: string;
}
