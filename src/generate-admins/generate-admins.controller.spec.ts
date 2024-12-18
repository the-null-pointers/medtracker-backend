import { Test, TestingModule } from '@nestjs/testing';
import { GenerateAdminsController } from './generate-admins.controller';
import { GenerateAdminsService } from './generate-admins.service';

describe('GenerateAdminsController', () => {
  let controller: GenerateAdminsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerateAdminsController],
      providers: [GenerateAdminsService],
    }).compile();

    controller = module.get<GenerateAdminsController>(GenerateAdminsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
