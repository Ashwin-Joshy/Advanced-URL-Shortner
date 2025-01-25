import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GuestUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceName: string;

  @Column()
  ipAddress: string;

  @Column({ nullable: true })
  geoLocation: string;
}
