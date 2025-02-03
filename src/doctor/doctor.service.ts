import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import responseHelper from 'src/helper/response-helper';
import { CreateTreatmentDto } from 'src/treatment/dto/create-treatment.dto';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDoctorDto: CreateDoctorDto) {
    let existUser = await this.prisma.user.findUnique({
      where: {
        phone: createDoctorDto.phone,
        // email: createDoctorDto.email,
      },
    });
    if (!existUser) {
      existUser = await this.prisma.user.create({
        data: {
          phone: createDoctorDto.phone,
          // email: createDoctorDto.email,
          roles: {
            connect: {
              name: 'DOCTOR',
            },
          },
        },
      });
    }
    const exitHospital = await this.prisma.hospital.findUnique({
      where: {
        id: createDoctorDto.hospital_id,
        admins: {
          some: {
            id: existUser.id,
          },
        },
      },
    });
    if (!exitHospital) {
      throw new NotFoundException(responseHelper.error('Hospital not found'));
    }
    // add doctor roles to the user if already exit
    await this.prisma.user.update({
      where: {
        phone: createDoctorDto.phone,
        // email: createDoctorDto.email,
      },
      data: {
        roles: {
          connect: {
            name: 'DOCTOR',
          },
        },
      },
    });
    const doctor = await this.prisma.doctor.create({
      data: {
        first_name: createDoctorDto.firstName,
        last_name: createDoctorDto.lastName,
        specialization: createDoctorDto.specialization,
        contact_info: createDoctorDto.contactInfo,

        user: {
          connect: {
            // phone: createDoctorDto.phone,
            email: createDoctorDto.email,
          },
        },
        hospitals: {
          connect: {
            id: createDoctorDto.hospital_id,
          },
        },
      },
      include: {
        user: {
          select: {
            phone: true,
            roles: true,
          },
        },
      },
    });
    return responseHelper.success('Doctor created successfully', doctor);
  }

  async doctorsInHospital(hospital_id: number, user: any) {
    const hospital = await this.prisma.hospital.findUnique({
      where: {
        id: hospital_id,
        admins: {
          some: {
            id: user.id,
          },
        },
      },
    });
    if (!hospital) {
      throw new NotFoundException(
        responseHelper.error(
          'Hospital not found or you are not admin of this hospital',
        ),
      );
    }
    const data = await this.prisma.doctor.findMany({
      where: {
        hospitals: {
          some: {
            id: hospital_id,
          },
        },
      },
      include: {
        user: {
          select: {
            phone: true,
            roles: true,
          },
        },
      },
    });
    return responseHelper.success('Doctors found successfully', data);
  }
  async allDoctors() {
    const data = await this.prisma.doctor.findMany({
      select: {
        first_name: true,
        last_name: true,
        specialization: true,
        contact_info: true,
      },
    });
    if (!data) {
      throw new NotFoundException(responseHelper.error('Doctors not found'));
    }
    return responseHelper.success('Doctors found successfully', data);
  }
  async doctorDetails(id: number, userId: string) {
    const data = await this.prisma.user.findUnique({
      where: {
        hospitals: {
          some: {
            id: id,
          },
        },
        id: userId,
      },
      include: {
        roles: true,
        doctor: {
          select: {
            treatments: {
              select: {
                id: true,
                treatment_name: true,
                diagnosis: true,
              },
            },
            visits: {
              select: {
                _count: true,
                id: true,
                visit_date: true,
                status: true,
                reason: true,
                tokenNo: true,
                patient: {
                  select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!data) {
      throw new NotFoundException(responseHelper.error('Doctors not found'));
    }
    return responseHelper.success('Doctors found successfully', data);
  }
  async patientsOfOneDoctor(id: number, hospital_id: number) {
    const visit_date = new Date();
    const startDate = new Date(visit_date);
    startDate.setDate(startDate.getDate() - 1); // Set start date to 24 hours ago
    const data = await this.prisma.visit.findMany({
      where: {
        hospital_id: hospital_id,
        doctor_id: id,
        status: 'QUEUE',
        visit_date: {
          gte: startDate,
          lte: visit_date,
        },
      },

      select: {
        id: true,
        reason: true,
        status: true,
        tokenNo: true,
        patient: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            revisit_interval: true,
            blood_group: true,
            gender: true,
          },
        },
      },
    });

    console.log(data);
    if (!data) {
      return responseHelper.success('No Patients found', []);
    }
    return responseHelper.success(
      'Visit detail with Patients details found successfully',
      { visits: data },
    );
  }
  async detailsOfOnePatientByDoctor(
    id: number,
    visit_id: number,
    hospital_id: number,
  ) {
    const visit_date = new Date();

    const startDate = new Date(visit_date);
    startDate.setDate(startDate.getDate() - 1);

    const data = await this.prisma.visit.findUnique({
      where: {
        hospital_id: hospital_id,
        doctor_id: id,
        id: visit_id,
        visit_date: {
          gte: startDate,
          lte: visit_date,
        },
      },
      include: {
        patient: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            revisit_interval: true,
            blood_group: true,
            gender: true,
            visits: {
              include: {
                treatments: true,
                doctor: true,
                labReports: true,
              },
            },
          },
        },
      },
    });
    if (!data) {
      throw new NotFoundException(responseHelper.error('Visit not found'));
    }
    return responseHelper.success('Visit found successfully', data);
  }

  async associateHospitalsOfDoctor(id: number) {
    try {
      const data = await this.prisma.hospital.findMany({
        where: {
          doctors: {
            some: {
              id: id,
            },
          },
        },
        select: {
          id: true,
          hospital_name: true,
        },
      });
      return responseHelper.success('Hospitals found successfully', data);
    } catch (error) {
      throw new BadRequestException(
        responseHelper.error(error.message, await error),
      );
    }
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id: id,
      },
    });
    if (!doctor) {
      throw new NotFoundException(responseHelper.error('Doctor not found'));
    }
    const updatedDoctor = await this.prisma.doctor.update({
      where: {
        id: id,
      },
      data: {
        first_name: updateDoctorDto.firstName,
        last_name: updateDoctorDto.lastName,
        specialization: updateDoctorDto.specialization,
        contact_info: updateDoctorDto.contactInfo,
      },
    });
    return responseHelper.success('Doctor updated successfully', updatedDoctor);
  }

  async remove(id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id: id,
      },
    });
    if (!doctor) {
      throw new NotFoundException(responseHelper.error('Doctor not found'));
    }
    const deletedDoctor = await this.prisma.doctor.delete({
      where: {
        id: id,
      },
    });
    return responseHelper.success('Doctor deleted successfully', deletedDoctor);
  }
}
