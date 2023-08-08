import {
  IsBoolean,
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  IsIn,
} from 'class-validator';
import { groupDefaultValue } from './group.entity';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(2 ** 16)
  groupNum: number;

  @IsBoolean()
  @IsNotEmpty()
  isSensorOperation: boolean;

  @IsInt()
  @IsNotEmpty()
  @Min(groupDefaultValue.minActiveSensorBrightness)
  @Max(groupDefaultValue.maxActiveSensorBrightness)
  activeSensorBrightness: number;

  @IsInt()
  @IsNotEmpty()
  @Min(groupDefaultValue.minDeactivateSensorBrightness)
  @Max(groupDefaultValue.maxDeactivateSensorBrightness)
  deactivateSensorBrightness: number;

  @IsInt()
  @IsNotEmpty()
  @Min(groupDefaultValue.minFixedModeBrightness)
  @Max(groupDefaultValue.maxFixedModeBrightness)
  fixedModeBrightness: number;

  @IsInt()
  @IsNotEmpty()
  @Min(groupDefaultValue.minSensorStrength)
  @Max(groupDefaultValue.maxSensorStrength)
  sensorStrength: number;

  @IsInt()
  @IsNotEmpty()
  @Min(groupDefaultValue.minSensorShiningDuration)
  @Max(groupDefaultValue.maxSensorShiningDuration)
  sensorShiningDuration: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(groupDefaultValue.sensorCycleDurationValues[0])
  @Max(
    groupDefaultValue.sensorCycleDurationValues[
      groupDefaultValue.sensorCycleDurationValues.length - 1
    ],
  )
  @IsIn(groupDefaultValue.sensorCycleDurationValues)
  sensorCycleDuration: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(groupDefaultValue.minFadeInTime)
  @Max(groupDefaultValue.maxFadeInTime)
  fadeInTime: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(groupDefaultValue.minFadeOutTime)
  @Max(groupDefaultValue.maxFadeOutTime)
  fadeOutTime: number;
}

export class UpdateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  isSensorOperation: boolean;

  @IsInt()
  @IsOptional()
  @Min(groupDefaultValue.minActiveSensorBrightness)
  @Max(groupDefaultValue.maxActiveSensorBrightness)
  activeSensorBrightness: number;

  @IsInt()
  @IsOptional()
  @Min(groupDefaultValue.minDeactivateSensorBrightness)
  @Max(groupDefaultValue.maxDeactivateSensorBrightness)
  deactivateSensorBrightness: number;

  @IsInt()
  @IsOptional()
  @Min(groupDefaultValue.minFixedModeBrightness)
  @Max(groupDefaultValue.maxFixedModeBrightness)
  fixedModeBrightness: number;

  @IsInt()
  @IsOptional()
  @Min(groupDefaultValue.minSensorStrength)
  @Max(groupDefaultValue.maxSensorStrength)
  sensorStrength: number;

  @IsInt()
  @IsOptional()
  @Min(groupDefaultValue.minSensorShiningDuration)
  @Max(groupDefaultValue.maxSensorShiningDuration)
  sensorShiningDuration: number;

  @IsNumber()
  @IsOptional()
  @Min(groupDefaultValue.sensorCycleDurationValues[0])
  @Max(
    groupDefaultValue.sensorCycleDurationValues[
      groupDefaultValue.sensorCycleDurationValues.length - 1
    ],
  )
  @IsIn(groupDefaultValue.sensorCycleDurationValues)
  sensorCycleDuration: number;

  @IsNumber()
  @IsOptional()
  @Min(groupDefaultValue.minFadeInTime)
  @Max(groupDefaultValue.maxFadeInTime)
  fadeInTime: number;

  @IsNumber()
  @IsOptional()
  @Min(groupDefaultValue.minFadeOutTime)
  @Max(groupDefaultValue.maxFadeOutTime)
  fadeOutTime: number;
}
