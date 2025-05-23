import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { Coin } from './entities/coin.entity';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Get()
  findAll() {
    return this.coinsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coinsService.findOne(+id);
  }

  @Post()
  create(@Body() coin: Coin) {
    return this.coinsService.create(coin);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() coin: Partial<Coin>) {
    return this.coinsService.update(+id, coin);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coinsService.remove(+id);
  }
} 