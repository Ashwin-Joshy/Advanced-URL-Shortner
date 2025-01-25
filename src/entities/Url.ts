import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  alias: string;

  @Column({ nullable: true })
  topic: string;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => User, user => user.urls)
  user: User;
}

