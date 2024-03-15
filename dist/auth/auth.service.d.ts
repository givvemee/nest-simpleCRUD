import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
