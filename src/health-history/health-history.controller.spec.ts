import { Test, TestingModule } from '@nestjs/testing';
import { HealthHistoryController } from './health-history.controller';
import { HealthHistoryService } from './health-history.service';

describe('HealthHistoryController', () => {
  let controller: HealthHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthHistoryController],
      providers: [HealthHistoryService],
    }).compile();

    controller = module.get<HealthHistoryController>(HealthHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
