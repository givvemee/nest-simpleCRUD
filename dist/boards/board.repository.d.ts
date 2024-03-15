import { User } from 'src/auth/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/createBoard.dto';
export declare class BoardRepository extends Repository<Board> {
    private dataSource;
    constructor(dataSource: DataSource);
    createBoard(createBoardDto: CreateBoardDTO, user: User): Promise<Board>;
}
