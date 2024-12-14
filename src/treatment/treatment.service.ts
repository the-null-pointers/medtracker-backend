import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import responseHelper from 'src/helper/response-helper';

@Injectable()
export class TreatmentService {
  constructor(private readonly prisma: PrismaService) {}
  async addTreatment(createTreatmentDto: CreateTreatmentDto, user: any) {
    if (!user?.doctor?.id) {
      throw new ForbiddenException(
        responseHelper.error('You are not a doctor'),
      );
    }
    const visit = await this.prisma.visit.findUnique({
      where: {
        id: createTreatmentDto.visit_id,
      },
    });
    if (!visit) {
      throw new NotFoundException(responseHelper.error('Visit not found'));
    }
    if (!visit.doctor_id) {
      await this.prisma.visit.update({
        where: {
          id: visit.id,
        },
        data: {
          doctor_id: user?.doctor.id,
        },
      });
    }
    const treatment = await this.prisma.treatment.create({
      data: {
        treatment_name: createTreatmentDto.treatment_name,
        symptoms: createTreatmentDto.symptoms,
        diagnosis: createTreatmentDto.diagnosis,
        treatment_date: createTreatmentDto.treatment_date,
        visit_id: visit.id,
        doctor_id: user?.doctor?.id,
      },
    });
    const prescription = await this.prisma.prescription.createMany({
      data: createTreatmentDto.prescriptions.map((prescription) => ({
        medication_name: prescription.medication_name,
        dosage: prescription.dosage,
        frequency: prescription.frequency,
        visit_id: visit.id,
        patient_id: visit.patient_id,
        start_date: prescription.start_date,
        end_date: prescription.end_date,
        doctor_id: user?.doctor?.id || undefined,
      })),
    });
    return responseHelper.success('Treatment added successfully', {
      treatment,
      prescription,
    });
  }

  async findAll() {
    const treatments = await this.prisma.treatment.findMany();
    if (!treatments) {
      throw new NotFoundException(responseHelper.error('Treatments not found'));
    }
    return responseHelper.success('Treatments found successfully', {
      treatments,
    });
  }

  async findOne(id: number) {
    const treatment = await this.prisma.treatment.findUnique({
      where: {
        id: id,
      },
    });
    if (!treatment) {
      throw new NotFoundException(responseHelper.error('Treatment not found'));
    }
    return responseHelper.success('Treatment found successfully', treatment);
  }

  async update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    let treatment = await this.prisma.treatment.findUnique({
      where: {
        id: id,
      },
    });
    if (!treatment) {
      throw new NotFoundException(responseHelper.error('Treatment not found'));
    }

    treatment = await this.prisma.treatment.update({
      where: {
        id: id,
      },
      data: {
        treatment_name: updateTreatmentDto.treatment_name,
        symptoms: updateTreatmentDto.symptoms,
        diagnosis: updateTreatmentDto.diagnosis,
        treatment_date: updateTreatmentDto.treatment_date,
      },
    });
    let visit = await this.prisma.visit.findUnique({
      where: {
        id: updateTreatmentDto.visit_id,
      },
    });
    if (!visit) {
      throw new NotFoundException(responseHelper.error('Visit not found'));
    }
    visit = await this.prisma.visit.update({
      where: {
        id: updateTreatmentDto.visit_id,
      },
      data: {
        prescriptions: {
          createMany: {
            data: updateTreatmentDto.prescriptions.map((prescription) => ({
              medication_name: prescription.medication_name,
              dosage: prescription.dosage,
              frequency: prescription.frequency,
              start_date: prescription.start_date,
              end_date: prescription.end_date,
              patient_id: visit.patient_id,
              doctor_id: visit.doctor_id,
            })),
          },
        },
      },
    });
    return responseHelper.success('Treatment updated successfully', treatment);
  }
  async updateTreatment(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    let visit = await this.prisma.visit.findUnique({
      where: {
        id: updateTreatmentDto.visit_id,
      },
    });
    if (!visit) {
      throw new NotFoundException(responseHelper.error('Visit not found'));
    }
  }
}
