import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class PendingTotalWithdrawalsDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  address: string;
}
