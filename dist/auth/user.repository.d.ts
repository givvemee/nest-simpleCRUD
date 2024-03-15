import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
export declare class UserRepository extends Repository<User> {
    private dateSource;
    constructor(dateSource: DataSource);
    createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
