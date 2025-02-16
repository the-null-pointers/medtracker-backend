import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import responseHelper from 'src/helper/response-helper';
import * as _ from 'lodash';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  async getAdminData() {
    const hospitals = await this.prisma.hospital.findMany({
      include: {
        visits: {
          include: {
            patient: true,
            prescriptions: true,
            treatments: true,
          },
        },
      },
    });

    if (_.isEmpty(hospitals)) {
      return responseHelper.error('No Data Found');
    }

    // Utility function to calculate age from DOB
    const calculateAge = (dob) => {
      if (!dob) return null;
      const diff = new Date().getTime() - new Date(dob).getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    };

    // Aggregate Data
    const aggregateData = (hospitals) => {
      let allVisits = _.flatMap(
        hospitals,
        (hospital) => hospital?.visits || [],
      );

      // 1. Top reasons for visits
      const reasonCounts = _.countBy(allVisits, 'reason');
      const topReasons = _(allVisits)
        .toPairs() // Convert object to array of [location, count]
        .orderBy(([_, count]) => count, 'desc') // Sort by count in descending order
        .slice(0, 3) // Take the top 3 locations
        .fromPairs() // Convert back to an object
        .value();

      // 2. Visits by location
      const visitsByLocation = _.countBy(hospitals, 'location');
      const topLocations = _(visitsByLocation)
        .toPairs() // Convert object to array of [location, count]
        .orderBy(([_, count]) => count, 'desc') // Sort by count in descending order
        .slice(0, 3) // Take the top 3 locations
        .fromPairs() // Convert back to an object
        .value();

      // 3. Gender distribution
      const genderCounts = _.countBy(allVisits.map((v) => v.patient.gender));

      // 4. Age distribution
      const ageGroups = allVisits.map((visit) => {
        const age = calculateAge(visit.patient.dob);
        if (age === null) return 'Unknown';
        if (age < 13) return 'Children';
        if (age < 20) return 'Teens';
        if (age < 60) return 'Adults';
        return 'Seniors';
      });
      const ageGroupCounts = _.countBy(ageGroups);

      // 5. Visit trends (by date)
      const visitDates = _.countBy(
        allVisits.map((v) =>
          v?.visit_date?.toISOString().split('T')[0]?.slice(0, 7),
        ),
      );

      // 6. Hospital performance
      const hospitalPerformance = hospitals.map((hospital) => ({
        hospital_name: hospital.hospital_name,
        total_visits: hospital.visits?.length || 0,
        unique_patients: _.uniqBy(hospital.visits, (v: any) => v?.patient?.id)
          .length,
      }));
      return {
        reasonCounts,
        topLocations,
        genderCounts,
        ageGroupCounts,
        visitDates,
        hospitalPerformance,
      };
    };
    return responseHelper.success('Success', aggregateData(hospitals));
  }
  async getHospitalData(id: number) {
    const hospitals = await this.prisma.hospital.findMany({
      where: {
        id,
      },
      include: {
        visits: {
          include: {
            patient: true,
            prescriptions: true,
            treatments: true,
          },
        },
      },
    });

    if (_.isEmpty(hospitals)) {
      return responseHelper.error('No Data Found');
    }

    // Utility function to calculate age from DOB
    const calculateAge = (dob) => {
      if (!dob) return null;
      const diff = new Date().getTime() - new Date(dob).getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    };

    // Aggregate Data
    const aggregateData = (hospitals) => {
      let allVisits = _.flatMap(
        hospitals,
        (hospital) => hospital?.visits || [],
      );

      // 1. Top reasons for visits
      const reasonCounts = _.countBy(allVisits, 'reason');
      const topReasons = _(allVisits)
        .toPairs() // Convert object to array of [location, count]
        .orderBy(([_, count]) => count, 'desc') // Sort by count in descending order
        .slice(0, 3) // Take the top 3 locations
        .fromPairs() // Convert back to an object
        .value();

      // 2. Visits by location
      const visitsByLocation = _.countBy(hospitals, 'location');
      const topLocations = _(visitsByLocation)
        .toPairs() // Convert object to array of [location, count]
        .orderBy(([_, count]) => count, 'desc') // Sort by count in descending order
        .slice(0, 3) // Take the top 3 locations
        .fromPairs() // Convert back to an object
        .value();

      // 3. Gender distribution
      const genderCounts = _.countBy(allVisits.map((v) => v.patient.gender));

      // 4. Age distribution
      const ageGroups = allVisits.map((visit) => {
        const age = calculateAge(visit.patient.dob);
        if (age === null) return 'Unknown';
        if (age < 13) return 'Children';
        if (age < 20) return 'Teens';
        if (age < 60) return 'Adults';
        return 'Seniors';
      });
      const ageGroupCounts = _.countBy(ageGroups);

      // 5. Visit trends (by date)
      const visitDates = _.countBy(
        allVisits.map((v) =>
          v?.visit_date?.toISOString().split('T')[0]?.slice(0, 7),
        ),
      );

      // 6. Hospital performance
      const hospitalPerformance = hospitals.map((hospital) => ({
        hospital_name: hospital.hospital_name,
        total_visits: hospital.visits?.length || 0,
        unique_patients: _.uniqBy(hospital.visits, (v: any) => v?.patient?.id)
          .length,
      }));
      return {
        reasonCounts,
        topLocations,
        genderCounts,
        ageGroupCounts,
        visitDates,
        hospitalPerformance,
      };
    };
    return responseHelper.success('Success', aggregateData(hospitals));
  }
}

const calculateAge = (dob) => {
  if (!dob) return null;
  const diff = new Date().getTime() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};
