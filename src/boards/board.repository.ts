import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { DataSource, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/createBoard.dto';

// repository 는 데이터베이스에 관련된 일. INSERT FIND DELETE 등등. 디비 관련된 일을 여기서 처리하고 서비스로 넘길 수 있음.
// @EntityRepository()
@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(
    createBoardDto: CreateBoardDTO,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user: user,
    });

    await this.save(board);
    return board;
  }
}
