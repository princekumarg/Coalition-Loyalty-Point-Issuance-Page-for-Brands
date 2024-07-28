import { Controller, UseGuards,Get,Body,Post,Req } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { IssueDto } from './dto/issue.dto';

@ApiTags('Loyalty')
@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('manage')
  @ApiOperation({description:"Brand Representative lists issued loyalty points",summary:"List Loyalty Points issued"})
  async manage(@Body() body:{neucron_token:string}){
    return await this.loyaltyService.manage(body.neucron_token);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('issue')
  @ApiOperation({description:"Brand Representative issues loyalty points",summary:"Issue Loyalty Points"})
  async issue(@Req() req, @Body() IssueDto:IssueDto){
    const userId=req.user.userId;
    const email=req.user.email;
    return await this.loyaltyService.issue(userId,email,IssueDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('brand-tokens')
  @ApiOperation({description:"Brand Representative can view if token has been issued",summary:"Get Brand Token Details"})
  async brandTokens(@Req() req){
    const userId=req.user.userId;
    return await this.loyaltyService.brandToken(userId);
  }
}
