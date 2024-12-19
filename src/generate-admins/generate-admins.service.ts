import { Injectable } from '@nestjs/common';
import { CreateGenerateAdminDto } from './dto/create-generate-admin.dto';
import { UpdateGenerateAdminDto } from './dto/update-generate-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import responseHelper from 'src/helper/response-helper';

@Injectable()
export class GenerateAdminsService {
  constructor(private readonly prisma: PrismaService) {}

  // create roles
  async createRoles(createGenerateAdminDto: CreateGenerateAdminDto) {
    const generateAdmins = await this.prisma.role.createMany({
      data: createGenerateAdminDto.roles,
    });
    // create admins and connect to all of the roles
    const admin = await this.prisma.user.create({
      data: {
        phone: '0000000000',
        email: 'test@gmail.com',
        roles: {
          connect: createGenerateAdminDto.roles,
        },
        patients: {
          createMany: {
            data: [
              {
                first_name: 'John',
                last_name: 'Doe',
                middle_name: 'A',
              },
              {
                first_name: 'Jane',
                last_name: 'Doe',
                middle_name: 'B',
              },
            ],
          },
        },
        hospitals: {
          create: {
            hospital_name: 'Hospital A',
            adminPhone: '0000000000',
            about: 'About Hospital A',
            location: 'Location A',
            contact_info: 'Contact Info A',
            isVerified: true,
          },
        },
        doctor: {
          create: {
            specialization: 'Specialization A',
            contact_info: 'Contact Info A',
            first_name: 'John',
            last_name: 'Doe',
            hospitals: {
              connect: {
                id: 1,
              },
            },
          },
        },
      },
      include: {
        hospitals: true,
        doctor: true,
        patients: true,
      },
    });

    return responseHelper.success('Admin created successfully', {
      admin,
    });
  }

  findAll() {
    return `This action returns all generateAdmins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generateAdmin`;
  }

  update(id: number, updateGenerateAdminDto: UpdateGenerateAdminDto) {
    return `This action updates a #${id} generateAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} generateAdmin`;
  }
}
