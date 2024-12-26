import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieparser from 'cookie-parser';
import * as mustache from 'mustache-express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Setting Cookie Parser
    app.use(cookieparser('RAHASIA-HAHA'));

    // Setting View
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'html');
    app.engine('html', mustache());

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
