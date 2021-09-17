import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AppController {

  constructor() {}

  @MessagePattern('test.kafka')
  readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const response =
        `Receiving a new message from topic: test.kafka: ` +
        JSON.stringify(originalMessage.value);
    console.log(response);

    return response;
  }

}
