import { Language as Lang } from '../../session/session.entity';
import { IErrLangRes } from '../interface/response.interface';

export const UserErrLang = {
  userNotFound(): IErrLangRes {
    return {
      [Lang.Kor]: `사용자를 찾을 수 없습니다`,
      [Lang.Eng]: `User not found`,
    };
  },
  accountNotExist(): IErrLangRes {
    return {
      [Lang.Kor]: `계정은 등록되지 않았습니다`,
      [Lang.Eng]: `This account has not been registered`,
    };
  },
  accountNotActive(): IErrLangRes {
    return {
      [Lang.Kor]: `계정이 비활성화되었습니다`,
      [Lang.Eng]: `This account has been deactivated`,
    };
  },
  incorrectPassword(): IErrLangRes {
    return {
      [Lang.Kor]: `비밀번호가 일치하지 않습니다`,
      [Lang.Eng]: `Password does not match`,
    };
  },
  activeSessionExist(): IErrLangRes {
    return {
      [Lang.Kor]: `ACTIVE_SESSION_EXIST`,
      [Lang.Eng]: `ACTIVE_SESSION_EXIST`,
    };
  },
  passwordCannotSame(): IErrLangRes {
    return {
      [Lang.Kor]: `새 비밀번호는 이전 비밀번호와 동일할 수 없습니다.`,
      [Lang.Eng]: `New password cannot be the same as your old password`,
    };
  },
  emailAlreadyExist(): IErrLangRes {
    return {
      [Lang.Kor]: `이 이메일은 이미 등록되었습니다`,
      [Lang.Eng]: `This email has been taken`,
    };
  },
  phoneNumberAlreadyExist(): IErrLangRes {
    return {
      [Lang.Kor]: `이 전화번호는 이미 등록되었습니다`,
      [Lang.Eng]: `This phone number has been taken`,
    };
  },
  oneOfAddressOrAddressDetailRequired(): IErrLangRes {
    return {
      [Lang.Kor]: `주소 또는 주소 세부정보 중 하나가 필요합니다.`,
      [Lang.Eng]: `One of address or address detail is required`,
    };
  },
};

export const AuthErrLang = {
  sessionExpired(): IErrLangRes {
    return {
      [Lang.Kor]: `로그인 세션이 만료되었습니다`,
      [Lang.Eng]: `This login session has been expired`,
    };
  },
  invalidTokenType(type: string): IErrLangRes {
    return {
      [Lang.Kor]: `${type} 토큰을 사용하세요`,
      [Lang.Eng]: `Please use the ${type} token`,
    };
  },
  unauthorized(): IErrLangRes {
    return {
      [Lang.Kor]: `무단`,
      [Lang.Eng]: `Unauthorized`,
    };
  },
  forbidden(): IErrLangRes {
    return {
      [Lang.Kor]: `금지한`,
      [Lang.Eng]: `Forbidden`,
    };
  },
};

export const LightErrLang = {
  lightNotFound(): IErrLangRes {
    return {
      [Lang.Kor]: `빛을 찾을 수 없음`,
      [Lang.Eng]: `Light not found`,
    };
  },

  macAddressAlreadyExist(macAddressDuplicate: string = ''): IErrLangRes {
    return {
      [Lang.Kor]: `MAC 주소가 이미 존재합니다  ${macAddressDuplicate}`,
      [Lang.Eng]: `MAC address already exist ${macAddressDuplicate}`,
    };
  },
  lightNameAlreadyExist(lightNameDuplicate: string = ''): IErrLangRes {
    return {
      [Lang.Kor]: `조명 이름이 이미 존재합니다.  ${lightNameDuplicate}`,
      [Lang.Eng]: `Light name already exist ${lightNameDuplicate}`,
    };
  },
  lightNumAlreadyExist(lightNumDuplicate: string = ''): IErrLangRes {
    return {
      [Lang.Kor]: `라이트 번호가 이미 있습니다.  ${lightNumDuplicate}`,
      [Lang.Eng]: `Light num already exist ${lightNumDuplicate}`,
    };
  },
  macAddressDuplicate(): IErrLangRes {
    return {
      [Lang.Kor]: `MAC 주소 중복`,
      [Lang.Eng]: `MAC address duplicate`,
    };
  },
  groupNumMustBeTheSame(): IErrLangRes {
    return {
      [Lang.Kor]: `그룹 번호는 동일해야 합니다.`,
      [Lang.Eng]: `Group num must be the same`,
    };
  },
  lightNameDuplicate(): IErrLangRes {
    return {
      [Lang.Kor]: `조명 이름 중복`,
      [Lang.Eng]: `Light name duplicate`,
    };
  },
  lightNumDuplicate(): IErrLangRes {
    return {
      [Lang.Kor]: `라이트 번호 중복`,
      [Lang.Eng]: `Light num duplicate`,
    };
  },
};
export const GroupErrLang = {
  groupNotFound(): IErrLangRes {
    return {
      [Lang.Kor]: `그룹을 찾을 수 없습니다`,
      [Lang.Eng]: `Group not found`,
    };
  },
  groupNameAlreadyExist(): IErrLangRes {
    return {
      [Lang.Kor]: `그룹 이름이 이미 있습니다`,
      [Lang.Eng]: `Group name already exist`,
    };
  },
  groupNumAlreadyExist(): IErrLangRes {
    return {
      [Lang.Kor]: `그룹 번호가 이미 있습니다`,
      [Lang.Eng]: `Group num already exist`,
    };
  },
  activeBrightnessValueMustLargerThanDeactivate(): IErrLangRes {
    return {
      [Lang.Kor]: `활성 밝기는 비활성화 밝기보다 커야 합니다`,
      [Lang.Eng]: `Active brightness must be larger than deactivated brightness`,
    };
  },
  lightExistInGroup(): IErrLangRes {
    return {
      [Lang.Kor]: `활성 전구가 그룹에 있습니다`,
      [Lang.Eng]: `Active lightbulb exists in the group`,
    };
  },
};

export const DefaultErrLang = {
  defaultSettingNotFound(): IErrLangRes {
    return {
      [Lang.Kor]: `이 사용자의 기본 설정을 찾을 수 없습니다`,
      [Lang.Eng]: `Default setting of this user is not found`,
    };
  },
  activeBrightnessValueMustLargerThanDeactivate(): IErrLangRes {
    return {
      [Lang.Kor]: `활성 밝기는 비활성화 밝기보다 커야 합니다`,
      [Lang.Eng]: `Active brightness must be larger than deactivated brightness`,
    };
  },
};
export const FirmwareErrLang = {
  firmwareVersionNotFound(): IErrLangRes {
    return {
      [Lang.Kor]: `펌웨어 버전을 찾을 수 없습니다`,
      [Lang.Eng]: `Firmware version not found`,
    };
  },
  firmwareVersionAlreadyExist(): IErrLangRes {
    return {
      [Lang.Kor]: `펌웨어 버전이 이미 존재합니다`,
      [Lang.Eng]: `Firmware version already exist`,
    };
  },
};
