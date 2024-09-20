import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dtos/userRegister.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>) { }


    async createUser(
        userRegisterDto: UserRegisterDto,
    ) {
        const user = this.userRepository.create(userRegisterDto);
        await this.userRepository.save(user);
        return user;

    }

}
