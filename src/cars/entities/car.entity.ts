
import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn} from 'typeorm';

@Entity()
export class Car {
   
    @PrimaryGeneratedColumn('uuid')
    id:string;

    
    @Column('text')
    first_name:string;

    
    @Column('text')
    last_name:string;


    @Column('text')
    email:string;

 
    @Column('text')
    car_make:string;

   
    @Column('text')
    car_model:string;

 
    @Column('text')
    vin:string;

 
    @CreateDateColumn()
    manufactured_date:Date;
    

    @Column('numeric')
    age_of_vehicle:number;


}
