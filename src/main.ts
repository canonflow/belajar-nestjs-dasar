import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieparser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setting Cookie Parser
  app.use(cookieparser('RAHASIA-HAHA'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
