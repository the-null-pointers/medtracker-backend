import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import responseHelper from 'src/helper/response-helper';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}
  async addPatient(createProfileDto: CreateProfileDto, user: any) {
    try {
      const profile = await this.prisma.user.update({
        where: {
          phone: user.phone,
        },
        data: {
          patients: {
            create: {
              first_name: createProfileDto.firstName,
              last_name: createProfileDto.lastName,
              middle_name: createProfileDto.middleName,
              identifier: createProfileDto.identifier,
              dob: createProfileDto.dob,
              gender: createProfileDto.gender,
              address: createProfileDto.address,
              contact_info: createProfileDto.contactInfo,
              image: createProfileDto.image,
              email: createProfileDto.email,
              e_contact: createProfileDto.eContact,
              blood_group: createProfileDto.bloodGroup,
              e_name: createProfileDto.eName,
              about: createProfileDto.about,
            },
          },
        },
        include: {
          patients: true,
        },
      });
      return responseHelper.success('Patient added successfully', profile);
    } catch (error) {
      throw new BadRequestException(
        responseHelper.error('Some fields are missing or invalid', await error),
      );
    }
  }

  async updatePatient(
    id: number,
    createProfileDto: UpdateProfileDto,
    user: any,
  ) {
    try {
      const profile = await this.prisma.user.update({
        where: {
          phone: user.phone,
        },
        data: {
          patients: {
            update: {
              where: {
                id: id,
              },
              data: {
                first_name: createProfileDto.firstName,
                last_name: createProfileDto.lastName,
                identifier: createProfileDto.identifier,
                dob: createProfileDto.dob,
                gender: createProfileDto.gender,
                address: createProfileDto.address,
                image: createProfileDto.image,
                middle_name: createProfileDto.middleName,
                email: createProfileDto.email,
                e_contact: createProfileDto.eContact,
                blood_group: createProfileDto.bloodGroup,
                e_name: createProfileDto.eName,
                about: createProfileDto.about,
              },
            },
          },
        },
        include: {
          patients: true,
        },
      });
      return responseHelper.success('Patient updated successfully', profile);
    } catch (error) {
      throw new BadRequestException(
        responseHelper.error('Some fields are missing or invalid', await error),
      );
    }
  }

  async findAllPatients(user: any) {
    try {
      const profile = await this.prisma.user.findUnique({
        where: {
          phone: user?.phone || undefined,
          email: user?.email || undefined,
        },
        select: {
          id: true,
          email: true,
          roles: true,
          phone: true,
          patients: {
            select: {
              id: true,
              e_name: true,
              first_name: true,
              last_name: true,
              middle_name: true,
            },
          },
        },
      });
      return responseHelper.success('Patients found successfully', profile);
    } catch (error) {
      throw new BadRequestException(
        responseHelper.error(error.message, await error),
      );
    }
  }
  async findOnePatient(id: number, user: any) {
    const patient = await this.prisma.patient.findUnique({
      where: {
        id: id,
        // user_id: user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            phone: true,
            email: true,
            roles: true,
          },
        },

        healthHistory: true,
        bills: true,
        prescriptions: {
          select: {
            id: true,
            dosage: true,
            frequency: true,
            medication_name: true,
          },
        },
        insurance: true,
        appointments: true,
        visits: {
          include: {
            hospital: {
              select: {
                id: true,
                hospital_name: true,
              },
            },
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(responseHelper.error('Patient not found'));
    }
    return responseHelper.success('Patient found successfully', patient);
  }

  async remove(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: {
        id: id,
      },
    });
    if (!patient) {
      throw new NotFoundException(responseHelper.error('Patient not found'));
    }
    const deletePatient = await this.prisma.patient.delete({
      where: {
        id: id,
      },
    });
    return responseHelper.success(
      'Patient deleted successfully',
      deletePatient,
    );
  }
}
