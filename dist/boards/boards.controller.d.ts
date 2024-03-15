import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/createBoard.dto';
export declare class BoardsController {
    private boardsService;
    private logger;
    constructor(boardsService: BoardsService);
    getAllBoards(user: User): Promise<Board[]>;
    getBoardById(id: number): Promise<Board>;
    createBoard(createBoardDTO: CreateBoardDTO, user: User): Promise<Board>;
    deleteBoard(id: any, user: User): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
