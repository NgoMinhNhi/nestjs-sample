import { Min } from 'class-validator';
import { Light } from 'src/light/light.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  
} from 'typeorm';

export enum GroupStatus {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED',
  Removed = 'REMOVED',
}

export const groupDefaultValue = {
  minActiveSensorBrightness: 11,
  maxActiveSensorBrightness: 100,
  sensorCycleDurationValues: ((max) => {
    const arrays = [];
    let value = 0;
    do {
      value += 0.5;
      arrays.push(value);
    } while (value < max);

    return arrays;
  })(8),
  minDeactivateSensorBrightness: 10,
  maxDeactivateSensorBrightness: 99,
  minFixedModeBrightness: 0,
  maxFixedModeBrightness: 100,
  minSensorStrength: 0,
  maxSensorStrength: 255,
  minSensorShiningDuration: 1,
  maxSensorShiningDuration: 65535,
  minFadeInTime: 0.1,
  maxFadeInTime: 25.5,
  minFadeOutTime: 0.1,
  maxFadeOutTime: 25.5,
};
@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  @Min(1)
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Index()
  @Column('smallint', { unsigned: true })
  groupNum: number;

  @OneToMany((light) => Light, (light) => light.group)
  lights: Light[];

  @ManyToOne(() => User, (user) => user.groups, { nullable: false })
  user: User;

  @Index()
  @Column({ type: 'enum', enum: GroupStatus, default: GroupStatus.Active })
  status: GroupStatus;

  @Column({ type: 'boolean', default: false })
  isSensorOperation: boolean;

  @Column({ type: 'tinyint' })
  activeSensorBrightness: number;

  @Column({ type: 'tinyint' })
  deactivateSensorBrightness: number;

  @Column({ type: 'tinyint' })
  fixedModeBrightness: number;

  @Column({ type: 'tinyint' })
  sensorStrength: number;

  @Column({ type: 'smallint', unsigned: true })
  sensorShiningDuration: number;

  @Column({ type: 'double', precision: 2, scale: 1 })
  sensorCycleDuration: number;

  @Column({ type: 'double', precision: 3, scale: 1 })
  fadeInTime: number;

  @Column({ type: 'double', precision: 3, scale: 1 })
  fadeOutTime: number;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
