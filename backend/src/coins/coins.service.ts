import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coin } from './entities/coin.entity';

@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(Coin)
    private coinsRepository: Repository<Coin>,
  ) {}

  findAll(): Promise<Coin[]> {
    return this.coinsRepository.find();
  }

  findOne(id: number): Promise<Coin> {
    return this.coinsRepository.findOneBy({ id });
  }

  create(coin: Partial<Coin>): Promise<Coin> {
    const newCoin = this.coinsRepository.create(coin);
    return this.coinsRepository.save(newCoin);
  }

  async update(id: number, coin: Partial<Coin>): Promise<Coin> {
    await this.coinsRepository.update(id, coin);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.coinsRepository.delete(id);
  }
} 