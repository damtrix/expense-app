import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}

  calculateSummary() {
    const getSum = (type: ReportType) => {
      return this.reportService
        .getAllReports(type)
        .reduce((sum, report) => sum + report.amount, 0);
    };

    const allExpense = getSum(ReportType.EXPENSE);
    const allIncome = getSum(ReportType.INCOME);

    return {
      totalIncome: allIncome,
      totalExpense: allExpense,
      netIncome: allIncome - allExpense,
    };
  }
}
