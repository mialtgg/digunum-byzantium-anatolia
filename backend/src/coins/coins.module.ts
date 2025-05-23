import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinsService } from './coins.service';
import { CoinsController } from './coins.controller';
import { Coin } from './entities/coin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coin])],
  controllers: [CoinsController],
  providers: [CoinsService],
})
export class CoinsModule {} 