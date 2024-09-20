import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dtos/user.dto';
import type { FindOptionsWhere } from 'typeorm';
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>) { }


    async createUser(
        userRegisterDto: UserRegisterDto,
    ) {
        const user = this.userRepository.create(userRegisterDto);
        const savedUser = await this.userRepository.save(user);
        return savedUser;

    }

    findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
        return this.userRepository.findOneBy(findData);
    }

}
