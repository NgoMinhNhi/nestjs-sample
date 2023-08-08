import { User } from 'src/user/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum FirmwareStatus {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED',
  Removed = 'REMOVED',
}

const versionToNum = (version: string) => {
  const versionToArr = version.split('.');

  return versionToArr.reduce((old, version) => {
    return (old += version.padStart(3, '0'));
  }, '');
};

@Entity()
export class Firmware {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.firmwares, { nullable: false })
  user: User;

  @Column('varchar')
  version: string;

  @Index()
  @Column({
    default: 0,
  })
  versionNum: number;

  @Index()
  @Column('varchar')
  note: string;

  @Column('varchar')
  downloadUrl: string;

  @Index()
  @Column({
    type: 'enum',
    enum: FirmwareStatus,
    default: FirmwareStatus.Active,
  })
  status: FirmwareStatus;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  addVersionNum() {
    this.versionNum = Number(versionToNum(this.version));
  }
}
