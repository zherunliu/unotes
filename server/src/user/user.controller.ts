import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { GetTokenInfo } from 'src/dec/get-token-info.decorator';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findOne(@GetTokenInfo('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch()
  update(@GetTokenInfo('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete()
  remove(@GetTokenInfo('id') id: number) {
    return this.userService.remove(+id);
  }
}
