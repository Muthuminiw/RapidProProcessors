import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CsvController } from './csv.controller';
import { CSVProcessor } from './csv.processor';

@Module({
    imports: [
      BullModule.registerQueue({
        name: 'csv',
      }),
    ],
    controllers: [CsvController],
    providers: [CSVProcessor],
  })
export class CsvModule {}
