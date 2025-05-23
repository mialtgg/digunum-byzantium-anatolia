import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'byzantine_coins',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Sadece geliştirme ortamında true olmalı
    }),
    CoinsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
