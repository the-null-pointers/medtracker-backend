import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { CurrentUser } from 'src/current-user/current-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  create(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @CurrentUser() user: any,
  ) {
    return this.feedbackService.create(createFeedbackDto, user);
  }

  @Get(':hospital_id')
  findAll(@Param('hospital_id') id: string) {
    return this.feedbackService.findAll(+id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.feedbackService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFeedbackDto: UpdateFeedbackDto,
  // ) {
  //   return this.feedbackService.update(+id, updateFeedbackDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.feedbackService.remove(+id);
  // }
}
