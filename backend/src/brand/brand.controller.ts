import { Controller, UseGuards,Post,Body,Req,Get } from '@nestjs/common';
import { BrandService } from './brand.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BrandDto } from './dto/brand.dto';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('details')
  @ApiOperation({description:'Get details of brand',summary:'Brand Details'})
  async details(@Req() req){
    const userId=req.user.userId;
    return await this.brandService.details(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('setup')
  @ApiOperation({description:'Brand Representative sets up the Brand',summary:'Brand Setup'})
  async setup(@Req() req, @Body() BrandDto:BrandDto){
    const userId=req.user.userId;
    const email=req.user.email;
    return await this.brandService.setup(userId,email,BrandDto);
  }
}
