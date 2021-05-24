import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { FileInterceptor } from '@nestjs/platform-express';
const path = require('path')

@Controller('csv')
export class CsvController {
  constructor(@InjectQueue('csv') private readonly csvQueue: Queue) { }
  uploadedCsvPath: string;


  @Post('upload')
  @UseInterceptors(FileInterceptor("file", { dest: "./uploads" }))
  async uploadCsv(@UploadedFile() file) {
    console.log('Code Controller started' + file.path);
    this.uploadedCsvPath = file.path;
    await this.csvQueue.add('upload', {
      file: path.resolve(file.path),
    });
  }

  @Get('upload')
  async getUploadCsv() {
    console.log('This is uploaded file path' + this.uploadedCsvPath);
    return this.uploadedCsvPath;

  }



  @Get()
  findAll() {
    return 'Hello Controller';
  }

}
