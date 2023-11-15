import { Module } from '@nestjs/common';
import { ClientiService } from './clienti.service';
import { ClientiController } from './clienti.controller';
import { ClienteEntity } from './entities/clienti.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/authToken.guards';
import { LoggerService } from 'src/logger/logger.service';
import { HttpService } from '@nestjs/axios';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClienteEntity]),
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '120s' },
    }),
    LoggerModule,
  ],

  controllers: [ClientiController],
  providers: [
    ClientiService,

    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class ClientiModule {}
