import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import responseHelper from 'src/helper/response-helper';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.prisma.role.findUnique({
      where: {
        name: createRoleDto.name,
      },
    });
    if (role) {
      throw new BadRequestException(responseHelper.error('Role already exist'));
    }
    const roles = await this.prisma.role.create({
      data: {
        name: createRoleDto.name,
      },
    });
    return responseHelper.success('Role created successfully', roles);
  }

  async findAll() {
    return await this.prisma.role.findMany();
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({
      where: {
        id: id,
      },
    });
    if (!role) {
      throw new NotFoundException(responseHelper.error('Role not found'));
    }
    return responseHelper.success('Role fetched successfully', role);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.prisma.role.findUnique({
      where: {
        id: id,
      },
    });
    if (!role) {
      throw new NotFoundException(responseHelper.error('Role not found'));
    }
    const updatedRole= await this.prisma.role.update({
      where: {
        id: id,
      },
      data: {
        name: updateRoleDto.name,
      },
    });
    return responseHelper.success('Role updated successfully', updatedRole);
  }

  async remove(id: number) {
    const role = await this.prisma.role.findUnique({
      where: {
        id: id,
      },
    });
    if (!role) {
      throw new NotFoundException(responseHelper.error('Role not found'));
    }
    const deletedRole=await this.prisma.role.delete({
      where: {
        id: id,
      },
    });
    return responseHelper.success('Role deleted successfully', deletedRole);
  }
}
