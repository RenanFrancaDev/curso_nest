import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Message } from 'src/message/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @OneToMany(() => Message, (message) => message.from)
  sentMessage: Message[];

  @OneToMany(() => Message, (message) => message.from)
  receivedMessage: Message[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
