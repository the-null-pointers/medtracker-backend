import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import responseHelper from 'src/helper/response-helper';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createFeedbackDto: CreateFeedbackDto, user: { id: string }) {
    const feedback = await this.prisma.feedback.create({
      data: {
        ...createFeedbackDto,
        userId: user.id,
      },
    });
    return responseHelper.success('Feedback Added successfully', feedback);
  }

  async findAll(id: number) {
    const feedback = await this.prisma.feedback.findMany({
      where: {
        hospitalId: id,
      },
    });
    if (!feedback) {
      throw new NotFoundException(
        responseHelper.success('Feedback not found', feedback),
      );
    }
    return responseHelper.success('Feedback fetched successfully', feedback);
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
