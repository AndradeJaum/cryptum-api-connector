import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CryptumService } from '../cryptum/cryptum.service';
import { Protocol } from '../cryptum/interfaces/protocols.interface';
import {
  CreateBitcoinTransferTransactionDto,
  CreateCeloTransferTransactionDto,
  CreateEthereumTransferTransactionDto,
  CreateHathorTransferTransactionDto,
  CreateRippleTransferTransactionDto,
  CreateStellarTransferTransactionDto,
  CreateTrustlineTransactionDto,
} from './dto/create-transaction.dto';
import { GetTransactionByHashDto } from './dto/get-transaction.dto';
import { GetUtxosDto } from './dto/get-utxo.dto';
import { SendTransactionDto } from './dto/send-transaction.dto';

@ApiTags('transaction')
@ApiExtraModels(CreateRippleTransferTransactionDto, CreateStellarTransferTransactionDto)
@Controller('transaction')
export class TransactionController {
  constructor(private cryptumService: CryptumService) {}

  @Get(':hash')
  getTransactionByHash(@Param('hash') hash: string, @Query('protocol') protocol: Protocol) {
    return this.cryptumService.getTransactionByHash(new GetTransactionByHashDto(hash, protocol));
  }
  @Get('utxo/:address')
  getUtxo(@Param('address') address: string, @Query('protocol') protocol: Protocol) {
    return this.cryptumService.getUtxos(new GetUtxosDto(address, protocol));
  }
  @Post('broadcast')
  sendTransaction(@Body() body: SendTransactionDto) {
    const { signedTx, type, protocol } = body;
    return this.cryptumService.sendTransaction(new SendTransactionDto(signedTx, type, protocol));
  }
  @Post('trustline')
  createTrustlineTransaction(@Body() body: CreateTrustlineTransactionDto) {
    return this.cryptumService.createTrustlineTransaction(body);
  }
  @Post('transfer/ripple')
  createRippleTransferTransaction(@Body() body: CreateRippleTransferTransactionDto) {
    return this.cryptumService.createStellarTransferTransaction(body);
  }
  @Post('transfer/stellar')
  createStellarTransferTransaction(@Body() body: CreateStellarTransferTransactionDto) {
    return this.cryptumService.createStellarTransferTransaction(body);
  }
  @Post('transfer/bitcoin')
  createBitcoinTransferTransaction(@Body() body: CreateBitcoinTransferTransactionDto) {
    return this.cryptumService.createBitcoinTransferTransaction(body);
  }
  @Post('transfer/celo')
  createCeloTransferTransaction(@Body() body: CreateCeloTransferTransactionDto) {
    return this.cryptumService.createCeloTransferTransaction(body);
  }
  @Post('transfer/ethereum')
  createEthereumTransferTransaction(@Body() body: CreateEthereumTransferTransactionDto) {
    return this.cryptumService.createEthereumTransferTransaction(body);
  }
  @Post('transfer/bsc')
  createBscTransferTransaction(@Body() body: CreateEthereumTransferTransactionDto) {
    return this.cryptumService.createBscTransferTransaction(body);
  }
  @Post('transfer/hathor')
  createHathorTransferTransaction(@Body() body: CreateHathorTransferTransactionDto) {
    return this.cryptumService.createHathorTransferTransaction(body);
  }
}