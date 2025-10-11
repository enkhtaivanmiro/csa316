import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterUserDto } from './register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: UsersService) {
    return this.usersService.uploadFile(file);
  }

  @ApiOperation({ summary: 'Get all users id and username' })
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get single user id and username' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Register a user' })
  @ApiBody({
    schema: {
      example: {
        username: 'enkhtaivan',
        email: 'jishee@email.com',
        password: '12345678',
      },
    },
  })
  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    const { username, email, password } = registerUserDto;
    return this.usersService.registerUser(username, email, password);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiBody({
    schema: {
      example: {
        usernameOrEmail: 'enkhtaivan or test@gmail.com',
        password: '12345678',
      },
    },
  })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(
      loginUserDto.usernameOrEmail,
      loginUserDto.password,
    );
  }

  @ApiOperation({ summary: 'Request password reset link' })
  @ApiBody({
    schema: {
      example: {
        email: "jishee@email.com"
      }
    }
  })
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.usersService.forgotPassword(dto.email);
  }

  @ApiOperation({ summary: 'Reset password using token' })
  @ApiBody({
    schema: {
      example: {
        token: 'randomResetTokenHere',
        newPassword: 'newPassword123',
      },
    },
  })
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.usersService.resetPassword(dto.token, dto.newPassword);
  }
}
