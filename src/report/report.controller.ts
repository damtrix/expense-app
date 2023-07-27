import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportType } from 'src/data';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from 'src/dtos/report.dto';

@Controller('/report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  reportType(type: string) {
    return type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
  }

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    return this.reportService.getAllReports(this.reportType(type));
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.reportService.getReportById(this.reportType(type), id);
  }

  @Post()
  createReport(
    @Body() { source, amount }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    return this.reportService.createReport(this.reportType(type), {
      source,
      amount,
    });
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    return this.reportService.updateReport(this.reportType(type), id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
