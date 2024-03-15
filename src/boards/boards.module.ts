import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
  controllers: [BoardsController],
  //   사용하고자 하는 service 를 이곳에서 provider 로 주입
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
