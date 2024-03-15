// 게시물의 로직을 처리하는 부분
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDTO } from './dto/createBoard.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDTO, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException(`${id} is not found`);
    }
    return found;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`${id} is not found `);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }

  async getAllBoard(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }
}
//   getAllBoards(): Board[] {
//     return this.boards;
//   }
//   createBoard(createBoardDto: CreateBoardDTO) {
//     const { title, description } = createBoardDto;
//     const board: Board = {
//       title,
//       description,
//       status: BoardStatus.PUBLIC,
//       // id 는 유니크해야 하기 때문에 로컬에서는 uuid 사용. DB 에서는 알아서 유니크하게 해줌
//       id: uuid(),
//     };
//     this.boards.push(board);
//     return board;
//   }
//   getBoardById(id: string): Board {
//     const found = this.boards.find((board) => board.id === id);
//     if (!found) {
//       throw new NotFoundException(`${id} is not found...`);
//     }
//     return found;
//   }
//   deletBoard(id: string): void {
//     const found = this.getBoardById(id);
//     this.boards = this.boards.filter((board) => board.id !== found.id);
//   }
//   updateBoardStatus(id: string, status: BoardStatus): Board {
//     const board = this.getBoardById(id);
//     board.status = status;
//     return board;
//   }
