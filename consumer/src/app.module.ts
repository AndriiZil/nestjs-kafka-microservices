import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'consumer',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'client_2',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'private',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
