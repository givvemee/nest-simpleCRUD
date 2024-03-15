import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/createBoard.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
// 인증된 (로그인) 된 사용자만 )
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardController');
  constructor(private boardsService: BoardsService) {}
  //   @Get('/')
  //   getAllBoard(): Board[] {
  //     return this.boardsService.getAllBoards();
  //   }

  @Get()
  getAllBoards(@GetUser() user: User) {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoard(user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDTO: CreateBoardDTO,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${user.username} trying to create new board. Payload: ${JSON.stringify(createBoardDTO)}`,
    );
    return this.boardsService.createBoard(createBoardDTO, user);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
  //   // 게시물 생성
  //   @Post()
  //   @UsePipes(ValidationPipe)
  //   createBoard(@Body() createBoardDto: CreateBoardDTO): Board {
  //     return this.boardsService.createBoard(createBoardDto);
  //   }
  //   @Get('/:id')
  //   getBoardById(@Param('id') id: string): Board {
  //     return this.boardsService.getBoardById(id);
  //   }
  //   @Delete()
  //   deleteBoard(@Param('id') id: string): void {
  //     this.boardsService.deletBoard(id);
  //   }
  //   @Patch('/:id/status')
  //   updateBoardStatus(
  //     @Param('id') id: string,
  //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  //   ) {
  //     return this.boardsService.updateBoardStatus(id, status);
  //   }
}
