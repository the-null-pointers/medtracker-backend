import { Test, TestingModule } from '@nestjs/testing';
import { GenerateAdminsService } from './generate-admins.service';

describe('GenerateAdminsService', () => {
  let service: GenerateAdminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateAdminsService],
    }).compile();

    service = module.get<GenerateAdminsService>(GenerateAdminsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
