import { Controller,Post,Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterBrandRepDto } from './dto/register.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth.guard';
import { NeucronLoginDto } from './dto/neucron-login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({description:"Brand Reprasentative registers with email",summary:"Register with email"})
  async register(@Body() RegisterBrandRepDto:RegisterBrandRepDto){
    return await this.authService.register(RegisterBrandRepDto)
  }

  @Post('login')
  @ApiOperation({description:"Brand Representative logs in using email",summary:"Login with email"})
  async login(@Body() LoginDto:LoginDto){
    return await this.authService.login(LoginDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('neucron-login')
  @ApiOperation({description:"Brand Representative logs into neucron wallet using email",summary:"Login to neucron wallet"})
  async neucronLogin(@Body() NeucronLoginDto:NeucronLoginDto){
    return await this.authService.neucronLogin(NeucronLoginDto);
  }
}
