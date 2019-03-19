import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/common/enums/transport.enum';

import { AppModule } from './app.module';
import config from './config/config';

const NATS_HOST = config.NATS_HOST;
const NATS_PORT = config.NATS_PORT;
const API_PORT = config.API_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microService = app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      url: `nats://${NATS_HOST}:${NATS_PORT}`,
    },
  });
  await app.startAllMicroservicesAsync();
  app.enableCors();
  await app.listen(API_PORT);
}
bootstrap();