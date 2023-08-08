import { Exclude, instanceToPlain } from 'class-transformer';
import { Default } from 'src/default/default.entity';
import { Firmware } from 'src/firmware/firmware.entity';
import { Group } from 'src/group/group.entity';
import { Light } from 'src/light/light.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Session } from '../session/session.entity';

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
  Any = 'ANY',
}

export enum UserStatus {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED',
  Removed = 'REMOVED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    type: 'enum',
    enum: [UserRole.User, UserRole.Admin],
    default: UserRole.User,
  })
  role: UserRole;

  @Index()
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Active })
  status: UserStatus;

  @Index()
  @Column('varchar', { length: 320 })
  email: string;

  @Index()
  @Column('varchar', { length: 65 })
  phoneNumber: string;

  @Index()
  @Column('varchar', { length: 255 })
  displayName: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('varchar', { length: 65 })
  companyName: string;

  @Column('varchar', { length: 255, nullable: true })
  address: string;

  @Column('varchar', { length: 255, nullable: true })
  addressDetail: string;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((session) => Session, (session) => session.user)
  sessions: Session[];

  @OneToMany((group) => Group, (group) => group.user)
  groups: Group[];

  @OneToMany((light) => Light, (light) => light.user)
  lights: Light[];

  @OneToOne(() => Default, (defaultSetting) => defaultSetting.user)
  default: Default;

  @OneToMany(() => Firmware, (firmware) => firmware.user)
  firmwares: Firmware[];

  toJSON() {
    const result = instanceToPlain(this);
    delete result.password;
    return result;
  }
}
