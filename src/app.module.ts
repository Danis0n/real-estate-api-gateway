import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { PostModule } from './post/post.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [UserModule, AuthModule, ImageModule, PostModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
