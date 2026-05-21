import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // tambahkan prefix 'api'
  app.setGlobalPrefix('api');

  // daftarkan ip yang diizinkan
  await app.listen(process.env.PORT!, 'localhost');
}
void bootstrap();
