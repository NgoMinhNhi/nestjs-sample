import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ISuccessResponse,
  Response,
} from '../utils/interface/response.interface';
import { Not, Repository } from 'typeorm';
import { CreateGroupDto, UpdateGroupDto } from './group.dto';
import { Group, GroupStatus } from './group.entity';
import { IQuery, IReqUser } from 'src/utils/interface/request.interface';
import { GroupErrorMessage } from './group.error';
import { LightStatus } from 'src/light/light.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async create(
    createGroupDto: CreateGroupDto,
    reqUser: IReqUser,
  ): Promise<ISuccessResponse> {
    if (
      createGroupDto.activeSensorBrightness <=
      createGroupDto.deactivateSensorBrightness
    ) {
      throw Response.error(
        GroupErrorMessage.activeBrightnessValueMustLargerThanDeactivate(),
      );
    }

    const user = { id: reqUser.userId };
    const [existGroupName, checkGroupNum] = await Promise.all([
      this.groupRepository.findOne({
        name: createGroupDto.name,
        user,
        status: Not(GroupStatus.Removed),
      }),
      this.groupRepository.findOne({
        groupNum: createGroupDto.groupNum,
        user,
        status: Not(GroupStatus.Removed),
      }),
    ]);

    if (existGroupName) {
      throw Response.error(GroupErrorMessage.groupNameAlreadyExist());
    }

    if (checkGroupNum) {
      throw Response.error(GroupErrorMessage.groupNumAlreadyExist());
    }

    const group = await this.groupRepository.save({ ...createGroupDto, user });
    return Response.success(group);
  }

  async get(reqUser: IReqUser, query: IQuery): Promise<ISuccessResponse> {
    const order = query.order;

    const condition = {
      user: { id: reqUser.userId },
      status: GroupStatus.Active,
    };
    const result = await this.groupRepository.find({
      where: condition,
      order: { createdAt: order },
    });
    return Response.success(result);
  }

  async update(
    groupNum: number,
    updateGroupDto: UpdateGroupDto,
    reqUser: IReqUser,
  ): Promise<ISuccessResponse> {
    const user = { id: reqUser.userId };
    const [group, existGroupName] = await Promise.all([
      this.groupRepository.findOne({
        groupNum,
        user,
        status: GroupStatus.Active,
      }),
      this.groupRepository.findOne({
        groupNum: Not(groupNum),
        name: updateGroupDto.name,
        user,
        status: GroupStatus.Active,
      }),
    ]);

    if (!group) {
      throw Response.error(GroupErrorMessage.groupNotFound());
    }

    const update = { ...group, ...updateGroupDto };

    if (update.activeSensorBrightness <= update.deactivateSensorBrightness) {
      throw Response.error(
        GroupErrorMessage.activeBrightnessValueMustLargerThanDeactivate(),
      );
    }

    if (existGroupName) {
      throw Response.error(GroupErrorMessage.groupNameAlreadyExist());
    }

    await this.groupRepository.update({ groupNum, user }, updateGroupDto);
    return Response.success();
  }

  async delete(groupNum: number, reqUser: IReqUser): Promise<ISuccessResponse> {
    const user = { id: reqUser.userId };

    const group = await this.groupRepository
      .createQueryBuilder('group')
      .where({
        groupNum,
        user,
        status: GroupStatus.Active,
      })
      .leftJoinAndSelect('group.lights', 'light', 'light.status = :status', {
        status: LightStatus.Active,
      })
      .getOne();

    if (!group) {
      throw Response.error(GroupErrorMessage.groupNotFound());
    }

    if (group.lights.length !== 0) {
      throw Response.error(GroupErrorMessage.lightExistInGroup());
    }

    await this.groupRepository.update(
      { id: group.id },
      { status: GroupStatus.Removed },
    );

    return Response.success();
  }

  async findByGroupNum(groupNum: number, userId: number): Promise<Group> {
    const group = await this.groupRepository.findOne({
      groupNum: groupNum,
      user: { id: userId },
      status: GroupStatus.Active,
    });

    if (!group) {
      throw Response.error(GroupErrorMessage.groupNotFound());
    }
    return group;
  }
}
