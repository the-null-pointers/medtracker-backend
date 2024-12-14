import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateHospitalDto,
  CreatePatientFromHospitalDto,
} from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import responseHelper from 'src/helper/response-helper';

@Injectable()
export class HospitalService {
  constructor(private readonly prisma: PrismaService) {}
  async createHospital(
    createHospitalDto: CreateHospitalDto,
    user: { roles: { name: string }[] },
  ) {
    const hostpitalAdmin = await this.prisma.user.findUnique({
      where: {
        phone: createHospitalDto.adminPhone,
      },
      include: {
        roles: true,
      },
    });
    let admin:
      | {
          phone: string;
          roles: {
            name: string;
          }[];
          id: string;
        }
      | undefined = undefined;

    if (!hostpitalAdmin) {
      admin = await this.prisma.user.create({
        data: {
          phone: createHospitalDto.adminPhone,
          roles: {
            connect: {
              name: 'HOSPITAL',
            },
          },
        },
        include: {
          roles: true,
        },
      });
    } else {
      admin = await this.prisma.user.update({
        where: {
          phone: createHospitalDto.adminPhone,
        },
        data: {
          roles: {
            connect: {
              name: 'HOSPITAL',
            },
          },
        },
        include: {
          roles: true,
        },
      });
    }
    try {
      const hospital = await this.prisma.hospital.create({
        data: {
          hospital_name: createHospitalDto.hospital_name,
          location: createHospitalDto.location,
          contact_info: createHospitalDto.contact_info,
          infoMail: createHospitalDto.infoMail,
          about: createHospitalDto.about,
          image: createHospitalDto.image,
          established: createHospitalDto.established,
          province: createHospitalDto.province,
          district: createHospitalDto.district,
          ward: createHospitalDto.ward,
          street: createHospitalDto.street,
          licenseNumber: createHospitalDto.licenseNumber,
          licenseExpiry: createHospitalDto.licenseExpiry,
          latitude: createHospitalDto.latitude,
          longitude: createHospitalDto.longitude,
          emergencyPhone: createHospitalDto.emergencyPhone,
          rating: 0,
          isVerified: user?.roles?.some((role) => role.name === 'ADMIN')
            ? createHospitalDto.isVerified
            : false,
          adminPhone: admin?.phone,

          admins: {
            connect: {
              id: admin?.id,
            },
          },
        },
      });
      return responseHelper.success('Hospital created successfully', hospital);
    } catch (error) {
      throw new InternalServerErrorException(
        responseHelper.error(error.message, error?.data),
      );
    }
  }

  async unVerifiedHospitals() {
    const data = await this.prisma.hospital.findMany({
      where: {
        isVerified: false,
      },
    });
    if (!data) {
      throw new NotFoundException(responseHelper.error('Hospitals not found'));
    }
    return responseHelper.success('Hospitals found successfully', data);
  }
  async verifyHospital(id: number) {
    const data = await this.prisma.hospital.update({
      where: {
        id: id,
      },
      data: {
        isVerified: true,
      },
    });
    return responseHelper.success('Hospital verified successfully', data);
  }

  async queuePatients(hospital_id: number) {
    const visit_date = new Date();
    const startDate = new Date(visit_date);
    const endDate = new Date(visit_date);
    endDate.setDate(endDate.getDate() + 1);
    const data = await this.prisma.visit.findMany({
      where: {
        hospital_id: hospital_id,
        visit_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        doctor: true,
        patient: true,
      },
    });
    if (!data) {
      return responseHelper.success('Patients not found', data);
    }
    return responseHelper.success('Patients found successfully', data);
  }

  async createPatient(createPatientDto: CreatePatientFromHospitalDto) {
    let details: any;
    let tokenNo: string;
    let isoDto = new Date().toISOString();
    tokenNo = isoDto
      .toString()
      .replace(/-/g, '')
      .replace('T', '')
      .replace(':', '-')
      .replace(':', '')
      .slice(0, 14);
    const user = await this.prisma.user.findUnique({
      where: {
        phone: createPatientDto.phone,
      },
      select: {
        patients: true,
      },
    });

    if (!user) {
      details = await this.prisma.user.create({
        data: {
          phone: createPatientDto.phone,
          patients: {
            create: {
              first_name: createPatientDto.firstName,
              last_name: createPatientDto.lastName,
              middle_name: createPatientDto.middleName,
              visits: {
                create: {
                  reason: createPatientDto.reason,
                  doctor_id: createPatientDto.doctorId || undefined,
                  visit_date: new Date().toISOString(),
                  hospital_id: createPatientDto.hospital_id,
                  tokenNo: tokenNo,
                },
              },
            },
          },
        },
        select: {
          patients: {
            select: {
              visits: true,
            },
          },
        },
      });
    }
    // if user exist but patient is not exist
    else if (
      !user.patients?.find(
        (p) =>
          p.first_name == createPatientDto.firstName &&
          p.last_name == createPatientDto.lastName &&
          p.gender == createPatientDto.gender,
      )
    ) {
      details = await this.prisma.user.update({
        where: {
          phone: createPatientDto.phone,
        },
        data: {
          patients: {
            create: {
              first_name: createPatientDto.firstName,
              last_name: createPatientDto.lastName,
              middle_name: createPatientDto.middleName,
              visits: {
                create: {
                  reason: createPatientDto.reason,
                  doctor_id: createPatientDto.doctorId || undefined,
                  visit_date: new Date().toISOString(),
                  hospital_id: createPatientDto.hospital_id,
                  tokenNo: tokenNo,
                },
              },
            },
          },
        },
        include: {
          patients: {
            select: {
              visits: true,
            },
          },
        },
      });
    }
    // if both user and patient exist
    else {
      details = await this.prisma.user.update({
        where: {
          phone: createPatientDto.phone,
        },
        data: {
          patients: {
            update: {
              where: {
                id: user.patients.find(
                  (p) =>
                    p.first_name === createPatientDto.firstName &&
                    p.last_name === createPatientDto.lastName &&
                    p.gender === createPatientDto.gender,
                ).id,
              },
              data: {
                first_name: createPatientDto.firstName,
                last_name: createPatientDto.lastName,
                middle_name: createPatientDto.middleName,
                visits: {
                  create: {
                    reason: createPatientDto.reason,
                    doctor_id: createPatientDto.doctorId || undefined,
                    visit_date: new Date(),
                    hospital_id: createPatientDto.hospital_id,
                    tokenNo: tokenNo,
                  },
                },
              },
            },
          },
        },
      });
    }

    return responseHelper.success('Patient created successfully', details);
  }

  // async findAllDataFromOneHospital(
  //   hospital_id: number,
  //   params: {
  //     skip: number;
  //     take: number;
  //     search: string;
  //     from: Date;
  //     to: Date;
  //   },
  // ) {
  //   const { skip, take, search, from, to } = params;
  //   const BASE_URL = process.env.BASE_URL;
  //   const totalRecords = await this.prisma.hospital.count({
  //     where: {
  //       id: hospital_id,
  //       visits: {
  //         some: {
  //           patient: {
  //             OR: [
  //               { first_name: { contains: search || undefined } },
  //               { middle_name: { contains: search || undefined } },
  //               { last_name: { contains: search || undefined } },
  //             ],
  //           },
  //         },
  //       },
  //       created_at: {
  //         gte: from || undefined,
  //         lte: to || undefined,
  //       },
  //     },
  //   });

  //   const data = await this.prisma.hospital.findMany({
  //     skip,
  //     take,
  //     where: {
  //       visits: {
  //         some: {
  //           patient: {
  //             OR: [
  //               { first_name: { contains: search } },
  //               { middle_name: { contains: search } },
  //               { last_name: { contains: search } },
  //             ],
  //           },
  //         },
  //       },
  //       created_at: {
  //         gte: from,
  //         lte: to,
  //       },
  //       id:hospital_id,
  //     },
  //     orderBy: {
  //       created_at: 'desc',
  //     },
  //     include: {
  //       _count: true,
  //       visits: {
  //         select: {
  //           reason: true,
  //           patient: {
  //             select: {
  //               first_name: true,
  //               middle_name: true,
  //               last_name: true,
  //               gender: true,
  //               user: {
  //                 select: {
  //                   phone: true,
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  //   // Calculate next and previous skip values
  //   const nextSkip = skip + take < totalRecords ? skip + take : null;
  //   const previousSkip = skip - take >= 0 ? skip - take : null;

  //   // Generate URLs
  //   const nextUrl = nextSkip
  //     ? `${BASE_URL}?skip=${nextSkip}&take=${take}&search=${search}&from=${from.toISOString()}&to=${to.toISOString()}`
  //     : null;

  //   const previousUrl = previousSkip
  //     ? `${BASE_URL}?skip=${previousSkip}&take=${take}&search=${search}&from=${from.toISOString()}&to=${to.toISOString()}`
  //     : null;

  //   return responseHelper.success('Available history Records', {
  //     totalRecords,
  //     data,
  //     pagination: {
  //       next: nextUrl,
  //       previous: previousUrl,
  //     },
  //   });
  // }

  async findAllDataFromOneHospital(hospital_id: number, user: any) {
    const data = await this.prisma.hospital.findUnique({
      where: {
        id: hospital_id,
        admins: {
          some: {
            id: user.id,
          },
        },
      },
      include: {
        visits: {
          where: {
            visit_date: {
              gte: new Date(),
            },
          },
          select: {
            visit_date: true,
            reason: true,
            treatments: {
              select: {
                treatment_name: true,
                diagnosis: true,
              },
            },
            patient: {
              select: {
                first_name: true,
                revisit_interval: true,
                gender: true,
                blood_group: true,
              },
            },
          },
        },
      },
    });
    return responseHelper.success('Available history Records', data);
  }
  async listOfPatients(id: number, user: any) {
    const data = await this.prisma.hospital.findUnique({
      where: {
        id: id,
        admins: {
          some: {
            id: user.id,
          },
        },
      },
      include: {
        visits: {
          select: {
            patient: true,
          },
        },
      },
    });
    const patients = data.visits.map((visit) => visit.patient);
    return responseHelper.success('Available history Records', patients);
  }

  async findAllHospital() {
    const data = await this.prisma.hospital.findMany();

    return responseHelper.success('All hospitals', data);
  }

  async findHospitalById(id: number) {
    const data = await this.prisma.hospital.findUnique({
      where: {
        id: id,
      },
      include: {},
    });
    return responseHelper.success('All hospitals', data);
  }
  async findHospital(id: string) {
    const data = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        hospitals: {
          select: {
            id: true,
            hospital_name: true,
          },
        },
      },
    });
    return responseHelper.success('All hospitals', data);
  }

  findOnePatient(id: number, user: any) {
    return `This action returns a #${id} hospital`;
  }

  async update(id: number, updateHospitalDto: UpdateHospitalDto) {
    const hospital = await this.prisma.hospital.findUnique({
      where: {
        id: id,
      },
    });
    if (!hospital) {
      throw new NotFoundException(responseHelper.error('Hospital not found'));
    }

    const updatedHospital = await this.prisma.hospital.update({
      where: {
        id: id,
      },
      data: {
        hospital_name: updateHospitalDto.hospital_name,
        location: updateHospitalDto.location,
        contact_info: updateHospitalDto.contact_info,
        infoMail: updateHospitalDto.infoMail,
        about: updateHospitalDto.about,
        // image: updateHospitalDto.image,
        established: updateHospitalDto.established,
        province: updateHospitalDto.province,
        district: updateHospitalDto.district,
        ward: updateHospitalDto.ward,
        street: updateHospitalDto.street,
        licenseNumber: updateHospitalDto.licenseNumber,
        licenseExpiry: updateHospitalDto.licenseExpiry,
        latitude: updateHospitalDto.latitude,
        longitude: updateHospitalDto.longitude,
        emergencyPhone: updateHospitalDto.emergencyPhone,
        rating: 0,
        adminPhone: updateHospitalDto.adminPhone,
      },
    });

    return responseHelper.success(
      'Hospital updated successfully',
      updatedHospital,
    );
  }

  async remove(id: number, user: any) {
    let hospital = undefined;
    let userDetails = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        roles: true,
      },
    });
    if (userDetails.roles.map((r) => r.name).includes('HOSPITAL')) {
      userDetails = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          hospitals: {
            disconnect: {
              id: id,
            },
          },
        },
        include: {
          roles: true,
        },
      });
    } else if (userDetails.roles.map((r) => r.name).includes('ADMIN')) {
      hospital = await this.prisma.hospital.findUnique({
        where: {
          id: id,
        },
        include: {
          admins: true,
        },
      });
      if (!hospital) {
        throw new NotFoundException('Hospital not found');
      }
      await this.prisma.hospital.delete({
        where: {
          id: id,
        },
      });
    } else {
      throw new ForbiddenException(
        'You are not authorized to delete this user',
      );
    }
  }
}
