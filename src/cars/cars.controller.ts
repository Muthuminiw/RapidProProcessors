import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
const multer = require("multer");

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post('uploadFile')
  uploadCsvFile(){
    
  }

  // app.post("/uploadFile", upload.single("myFile"), (req, res, next) => { // myFile should be the same value as used in HTML name attribute of input
  //   const file = req.file; // We get the file in req.file
  
  //   if (!file) { // in case we do not get a file we return
  //     const error = new Error("Please upload a file");
  //     error.httpStatusCode = 400;
  //     return next(error);
  //   }
  //   const multerText = Buffer.from(file.buffer).toString("utf-8"); // this reads and converts the contents of the text file into string
  
  //   const result = { // the final object which will hold the content of the file under fileText key.
  //     fileText: multerText,
  //   };
  
  //   res.send(result);
  // });

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
