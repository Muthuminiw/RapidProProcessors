import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [TypeOrmModule.forRoot(),BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),CsvModule,CarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
