import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
  IsIn,
} from 'class-validator';
import { groupDefaultValue } from '../group/group.entity';

export class UpdateDefaultDto {
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
