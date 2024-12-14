import { Test, TestingModule } from '@nestjs/testing';
import { HealthHistoryService } from './health-history.service';

describe('HealthHistoryService', () => {
  let service: HealthHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthHistoryService],
    }).compile();

    service = module.get<HealthHistoryService>(HealthHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
