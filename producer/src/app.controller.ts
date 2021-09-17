import {Controller, Get, Inject, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(
      private readonly appService: AppService,
      @Inject('test_kafka') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    ['test.kafka'].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('kafka-test')
  testKafka(){
    return this.client.emit('test.kafka', { foo:'bar', data: new Date().toString() })
  }

  @Get('kafka-test-with-response')
  testKafkaWithResponse(){
    return this.client.send('test.kafka', { foo:'bar', data: new Date().toString() })
  }

}
