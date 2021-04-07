import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) { }

  create(createCarDto: CreateCarDto) {
    const am = this.carRepository.create(createCarDto);
    this.carRepository.save(am);
    return am;
  }

  findAll() {
    return this.carRepository.find();
  }

  findOne(id: string) {
    return this.carRepository.findOne({ where: { id } });
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    this.carRepository.update({ id }, updateCarDto);
    return this.carRepository.findOne({ id });
  }

  remove(id: string) {
    this.carRepository.delete({ id });
    return { deleted: true };
  }
}
