import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ISuccessResponse,
  Response,
} from '../utils/interface/response.interface';
import { In, Not, Repository } from 'typeorm';
import { Light, LightStatus } from './light.entity';
import {
  CreateLightsDto,
  GetLightsDto,
  UpdateLightDto,
  MacAddressDto,
} from './light.dto';
import { GroupService } from 'src/group/group.service';
import { IReqUser } from 'src/utils/interface/request.interface';
import { LightErrorMessage } from './light.error';

@Injectable()
export class LightService {
  constructor(
    @InjectRepository(Light)
    private lightRepository: Repository<Light>,
    @Inject(forwardRef(() => GroupService))
    private groupService: GroupService,
  ) {}
  async create(
    createLightsDto: CreateLightsDto,
    reqUser: IReqUser,
  ): Promise<ISuccessResponse> {
    const user = { id: reqUser.userId };

    //Get mac addresses, light name, group num light num

    const [lightNames, macAddresses, groupNums, LightNums] = [
      //only get light name that is not null
      createLightsDto.lights.map((item) => item.name),
      createLightsDto.lights.map((item) => item.macAddress),
      createLightsDto.lights.map((item) => item.groupNum),
      createLightsDto.lights.map((item) => item.lightNum),
    ];

    // Check unique MAC address
    if ([...new Set(macAddresses)].length !== macAddresses.length) {
      throw Response.error(LightErrorMessage.macAddressDuplicate());
    }

    // Check unique light name
    if ([...new Set(lightNames)].length !== lightNames.length) {
      throw Response.error(LightErrorMessage.lightNameDuplicate());
    }

    // Check group num must be the same
    if ([...new Set(groupNums)].length !== 1) {
      throw Response.error(LightErrorMessage.groupNumMustBeTheSame());
    }

    // Check duplicate light num
    if ([...new Set(LightNums)].length !== LightNums.length) {
      throw Response.error(LightErrorMessage.lightNumDuplicate());
    }

    const group = await this.groupService.findByGroupNum(
      createLightsDto.lights[0].groupNum,
      reqUser.userId,
    );

    const promise = [
      this.lightRepository.find({
        macAddress: In(macAddresses),
        user,
        status: Not(LightStatus.Removed),
      }),
      this.lightRepository.find({
        lightNum: In(LightNums),
        user,
        group,
        status: Not(LightStatus.Removed),
      }),
      this.lightRepository.find({
        name: In(lightNames),
        group,
        status: Not(LightStatus.Removed),
      }),
    ];

    const [existMacAddresses, existLightNums, existLightNames] =
      await Promise.all(promise);

    if (existMacAddresses.length) {
      throw Response.error(
        LightErrorMessage.macAddressAlreadyExist(
          existMacAddresses.map((item) => item.macAddress).join(', '),
        ),
      );
    }

    if (existLightNums.length) {
      throw Response.error(
        LightErrorMessage.lightNumAlreadyExist(
          existLightNums.map((item) => item.lightNum).join(', '),
        ),
      );
    }
    if (existLightNames.length) {
      throw Response.error(
        LightErrorMessage.lightNameAlreadyExist(
          existLightNames.map((item) => item.name).join(', '),
        ),
      );
    }

    await Promise.all(
      createLightsDto.lights.map(async (light) => {
        return this.lightRepository.save({ ...light, group, user });
      }),
    );
    return Response.success();
  }

  async update(
    macAddress: string,
    updateLightDto: UpdateLightDto,
    reqUser: IReqUser,
  ): Promise<ISuccessResponse> {
    const user = { id: reqUser.userId };

    const [light, group] = await Promise.all([
      this.lightRepository.findOne({
        macAddress,
        user,
        status: Not(LightStatus.Removed),
      }),
      this.groupService.findByGroupNum(updateLightDto.groupNum, reqUser.userId),
    ]);

    if (!light) {
      throw Response.error(LightErrorMessage.lightNotFound());
    }

    const [existLightNum, existLightName] = await Promise.all([
      this.lightRepository.findOne({
        id: Not(light.id),
        group,
        lightNum: updateLightDto.lightNum,
        status: Not(LightStatus.Removed),
      }),
      this.lightRepository.findOne({
        macAddress: Not(macAddress),
        name: updateLightDto.name,
        group,
        status: Not(LightStatus.Removed),
      }),
    ]);

    if (existLightNum) {
      throw Response.error(LightErrorMessage.lightNumAlreadyExist());
    }

    if (existLightName) {
      throw Response.error(LightErrorMessage.lightNameAlreadyExist());
    }

    const update = { ...updateLightDto, group };

    delete update.groupNum;

    await this.lightRepository.update({ macAddress, user }, update);

    return Response.success();
  }

  async get(
    getLightsDto: GetLightsDto,
    reqUser: IReqUser,
  ): Promise<ISuccessResponse> {
    const order = getLightsDto.order;

    const condition = {
      user: reqUser.userId,
      status: LightStatus.Active,
    };

    const lights = await this.lightRepository
      .createQueryBuilder('light')
      .select(['light', 'group.groupNum'])
      .leftJoin('light.group', 'group')
      .where(condition)
      .orderBy('light.createdAt', order)
      .getMany();

    return Response.success(lights);
  }

  async delete(
    macAddress: string,
    reqUser: IReqUser,
  ): Promise<ISuccessResponse> {
    const light = await this.lightRepository.findOne({
      macAddress,
      user: { id: reqUser.userId },
      status: Not(LightStatus.Removed),
    });

    if (!light) {
      throw Response.error(LightErrorMessage.lightNotFound());
    }
    await this.lightRepository.update(
      { id: light.id },
      { group: null, status: LightStatus.Removed },
    );
    return Response.success();
  }
}
