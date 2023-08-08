import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/utils/interface/pagination.interface';
import { IReqUser } from 'src/utils/interface/request.interface';
import {
  ISuccessResponse,
  Response,
} from 'src/utils/interface/response.interface';
import { Like, Not, Repository } from 'typeorm';
import {
  CreateFirmwareDto,
  GetFirmwaresDto,
  UpdateFirmwareDto,
} from './firmware.dto';
import { Firmware, FirmwareStatus } from './firmware.entity';
import { FirmwareErrorMessage } from './firmware.error';

@Injectable()
export class FirmwareService {
  constructor(
    @InjectRepository(Firmware)
    private firmwareRepository: Repository<Firmware>,
  ) {}

  async get(getFirmwaresDto: GetFirmwaresDto): Promise<ISuccessResponse> {
    const page = getFirmwaresDto.page;
    const limit = getFirmwaresDto.limit;
    const order = getFirmwaresDto.order;
    const skip = (page - 1) * limit;

    const orConditions = [];

    if (getFirmwaresDto.keyword) {
      const keyword = getFirmwaresDto.keyword;
      orConditions.push(
        {
          status: FirmwareStatus.Active,
          version: Like('%' + keyword + '%'),
        },
        {
          status: FirmwareStatus.Active,
          note: Like('%' + keyword + '%'),
        },
      );
    } else {
      orConditions.push({
        status: FirmwareStatus.Active,
      });
    }

    const [firmwares, total] = await this.firmwareRepository.findAndCount({
      where: orConditions,
      relations: ['user'],
      take: limit,
      skip: skip,
      order: { versionNum: order },
    });

    const result = Pagination.create(firmwares, total, page, limit);
    return Response.success(result);
  }

  async detail(firmwareId: number): Promise<ISuccessResponse> {
    const firmware = await this.firmwareRepository.findOne({
      id: firmwareId,
      status: FirmwareStatus.Active,
    });
    return Response.success(firmware);
  }

  async newest(): Promise<ISuccessResponse> {
    const firmware = await this.firmwareRepository.findOne(
      {
        status: FirmwareStatus.Active,
      },
      {
        order: {
          createdAt: -1,
        },
      },
    );

    if (!firmware) {
      throw Response.error(FirmwareErrorMessage.firmwareVersionNotFound());
    }

    return Response.success({
      ...firmware,
      version: firmware.version.split('.').map((item) => Number(item)),
    });
  }

  async create(
    createFirmwareDto: CreateFirmwareDto,
    reqUser: IReqUser,
  ): Promise<ISuccessResponse> {
    const existVersion = await this.firmwareRepository.findOne({
      version: createFirmwareDto.version,
      status: FirmwareStatus.Active,
    });

    if (existVersion) {
      throw Response.error(FirmwareErrorMessage.firmwareVersionAlreadyExist());
    }

    const firmware = this.firmwareRepository.create({
      ...createFirmwareDto,
      user: { id: reqUser.userId },
    });

    await this.firmwareRepository.save(firmware);
    return Response.success();
  }

  async update(
    firmwareId: number,
    updateFirmwareDto: UpdateFirmwareDto,
  ): Promise<ISuccessResponse> {
    const firmware = await this.firmwareRepository.findOne({
      id: firmwareId,
      status: FirmwareStatus.Active,
    });

    if (!firmware) {
      throw Response.error(FirmwareErrorMessage.firmwareVersionNotFound());
    }

    const existVersion = await this.firmwareRepository.findOne({
      id: Not(firmwareId),
      version: updateFirmwareDto.version,
      status: FirmwareStatus.Active,
    });

    if (existVersion) {
      throw Response.error(FirmwareErrorMessage.firmwareVersionAlreadyExist());
    }

    const update = this.firmwareRepository.create({
      id: firmwareId,
      ...updateFirmwareDto,
    });
    await this.firmwareRepository.save(update);
    return Response.success();
  }
}
