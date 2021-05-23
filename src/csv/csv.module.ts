import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CsvController } from './csv.controller';
import { CSVProcessor } from './csv.processor';
import { AppGateway } from 'src/app.gateway';

@Module({
    imports: [
      BullModule.registerQueue({
        name: 'csv',
      }),
    ],
    controllers: [CsvController],
    providers: [CSVProcessor,AppGateway],
  })
export class CsvModule {}
