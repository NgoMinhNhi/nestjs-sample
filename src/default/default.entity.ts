import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Default {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.default, { nullable: false })
  @JoinColumn()
  user: User;

  @Column({ type: 'boolean', default: false })
  isSensorOperation: boolean = true;

  @Column({ type: 'tinyint' })
  activeSensorBrightness: number = 100;

  @Column({ type: 'tinyint' })
  deactivateSensorBrightness: number = 10;

  @Column({ type: 'tinyint' })
  fixedModeBrightness: number = 50;

  @Column({ type: 'tinyint' })
  sensorStrength: number = 4;

  @Column({ type: 'smallint', unsigned: true })
  sensorShiningDuration: number = 10;

  @Column({ type: 'double', precision: 2, scale: 1 })
  sensorCycleDuration: number = 3;

  @Column({ type: 'double', precision: 3, scale: 1 })
  fadeInTime: number = 1;

  @Column({ type: 'double', precision: 3, scale: 1 })
  fadeOutTime: number = 5;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
