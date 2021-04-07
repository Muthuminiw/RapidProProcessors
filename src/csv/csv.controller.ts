import { Controller, Get, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('csv')
export class CsvController {
    constructor(@InjectQueue('csv') private readonly csvQueue: Queue) {}

    @Post('upload')
  async uploadCsv() {
    console.log('Code Controller started');
    await this.csvQueue.add('upload', {
      file: 'E:/PenProject/AssignmentData/sampledata.csv',
    });
  }

  
  @Get()
  findAll() {
    return 'Hellow Controller';
  }

}
