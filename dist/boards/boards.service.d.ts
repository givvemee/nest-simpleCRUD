import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDTO } from './dto/createBoard.dto';
export declare class BoardsService {
    private boardRepository;
    constructor(boardRepository: BoardRepository);
    createBoard(createBoardDto: CreateBoardDTO, user: User): Promise<Board>;
    getBoardById(id: number): Promise<Board>;
    deleteBoard(id: number, user: User): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
    getAllBoard(user: User): Promise<Board[]>;
}
