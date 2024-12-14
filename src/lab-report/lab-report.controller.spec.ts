import { Test, TestingModule } from '@nestjs/testing';
import { LabReportController } from './lab-report.controller';
import { LabReportService } from './lab-report.service';

describe('LabReportController', () => {
  let controller: LabReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabReportController],
      providers: [LabReportService],
    }).compile();

    controller = module.get<LabReportController>(LabReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
