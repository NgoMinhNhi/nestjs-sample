import { instanceToPlain } from 'class-transformer';
import { Group } from 'src/group/group.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum LightStatus {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED',
  Removed = 'REMOVED',
}

@Entity()
export class Light {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('smallint', { unsigned: true })
  lightNum: number;

  // @Index({ unique: true })
  @Column('varchar', { length: 255 })
  macAddress: string;

  @ManyToOne(() => Group, (group) => group.lights)
  group: Group;

  @ManyToOne(() => User, (user) => user.lights, { nullable: false })
  user: User;

  @Index()
  @Column({ type: 'enum', enum: LightStatus, default: LightStatus.Active })
  status: LightStatus;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toJSON() {
    const result = instanceToPlain(this);
    if (this.group) {
      result.groupNum = result.group.groupNum;
    } else {
      result.groupNum = 0;
    }
    delete result.group;
    return result;
  }
}
