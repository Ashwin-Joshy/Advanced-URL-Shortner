import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  alias: string;

  @Column({ nullable: true })
  topic: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column()
  ipAddress: string;

  @Column()
  deviceName: string;

  @Column({ nullable: true })
  deviceType: string;

  @Column({ nullable: true })
  geoLocation: string;
}
