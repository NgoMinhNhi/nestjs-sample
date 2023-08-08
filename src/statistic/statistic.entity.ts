import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum StatisticStatus {
  Active = 'ACTIVE',
  Removed = 'REMOVED',
}

export enum StatisticKey {
  forgotPasswordPhoneNumber = 'FORGOT_PASSWORD_PHONE_NUMBER',
  companyInfo = 'COMPANY_INFO',
}

export const StatisticDefault = {
  forgotPasswordPhoneNumber: { phoneNumber: '1566-2718' },
  companyInfo: {
    detail:
      '금호전기 주식회사 \n세상의 모든 빛, 번개표 \n서울시 영등포구 국제금융로 10 Tree IFC 14층 \nTEL 1566-2718',
    copyright: 'COPYRIGHT(c) 2010 KUMHO ELECTRIC,INC. ALL RIGHT RESERVED.',
  },
};
@Entity()
export class Statistic {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({
    type: 'enum',
    enum: StatisticKey,
  })
  key: StatisticKey;

  @Column('simple-json')
  value: object;

  @Index()
  @Column({
    type: 'enum',
    enum: StatisticStatus,
    default: StatisticStatus.Active,
  })
  status: StatisticStatus;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
