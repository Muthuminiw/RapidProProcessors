import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Car } from 'src/cars/entities/car.entity';
import { getConnection } from "typeorm";
const csv = require('csvtojson')

@Processor('csv')
export class CSVProcessor {
  private readonly logger = new Logger(CSVProcessor.name);

  @Process('upload')
  async handleCsvUpdate(job: Job) {
    this.logger.debug('Started uploading...');

    this.logger.debug("This job data file " + job.data.file);

    let jsonArray = await csv().fromFile(job.data.file)
      .then(carDetails => {

        return carDetails;

      }).catch(err => {
        // log error if any
        this.logger.error(err);
      });

    const connection = getConnection();

    const carObjlist : Car[] = [];
    for (var i = 0; i < jsonArray.length; i++) {
      const carObj = new Car();
      carObj.first_name = jsonArray[i].first_name;
      carObj.last_name = jsonArray[i].last_name;
      carObj.email = jsonArray[i].email;
      carObj.car_make = jsonArray[i].car_make;
      carObj.car_model = jsonArray[i].car_model;
      carObj.vin = jsonArray[i].vin_number;
      carObj.manufactured_date = new Date(jsonArray[i].manufactured_date);
      var manFacDate = new Date(jsonArray[i].manufactured_date);

      const diff = Date.now() - manFacDate.getTime();

      const ageDate = new Date(diff);

      console.log(ageDate.getUTCFullYear());


      var age_of_vehicle = Math.abs(ageDate.getUTCFullYear() - 1970);
   
      carObj.age_of_vehicle = age_of_vehicle;

      this.logger.debug("Push to array " + JSON.stringify(carObj));
      carObjlist.push(carObj);


    }

    
    this.logger.debug("Push to array " + JSON.stringify(carObjlist));
    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Car)
    .values(carObjlist)
    .execute();

    this.logger.debug('Completed uploading...');
  }
}