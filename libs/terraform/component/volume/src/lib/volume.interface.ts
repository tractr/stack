import { efs, vpc } from '@cdktf/provider-aws';

export interface VolumeComponentConfig {
  vpcId: string;
  subnetsIds: string[];
  clientsSecurityGroupsIds: string[];
  performanceMode?: 'generalPurpose' | 'maxIO';
  transitionToIa?:
    | 'AFTER_7_DAYS'
    | 'AFTER_14_DAYS'
    | 'AFTER_30_DAYS'
    | 'AFTER_60_DAYS'
    | 'AFTER_90_DAYS';
  preventDestroy?: boolean;
  enableBackups?: boolean;
}
export interface VolumeComponentArtifacts {
  efsFileSystem: efs.EfsFileSystem;
  securityGroup: vpc.SecurityGroup;
}
