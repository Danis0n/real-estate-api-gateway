import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [UserModule, AuthModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
