import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../user/user.entity';

export enum SessionStatus {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED',
  Removed = 'REMOVED',
}

export enum Language {
  Kor = 'KOREAN',
  Eng = 'ENGLISH',
}

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Language, default: Language.Kor })
  language: Language;

  @Index()
  @Column({ type: 'enum', enum: SessionStatus, default: SessionStatus.Active })
  status: SessionStatus;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;
}
