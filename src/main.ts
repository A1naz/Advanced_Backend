import { NestFactory } from '@nestjs/core';
import { appModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(appModule);

  await app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

start();
