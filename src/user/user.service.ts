import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateUserInput } from './odt/create-user.input';
import { UpdateUserInput } from './odt/update-user.input';

import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();

        return users;
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userRepository.findOne(userId);

        if (!user) {
            throw new NotFoundException("Usuário não encontrado.");
        }

        return user;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new NotFoundException("Usuário não encontrado.");
        }

        return user;
    }

    async createUser(data: CreateUserInput): Promise<User> {
        const user = this.userRepository.create(data);
        const userSaved = await this.userRepository.save(user);

        if (!userSaved) {
            throw new InternalServerErrorException("Problema para criar um usuário.");
        }

        return userSaved;
    }

    async updateUser(userId: string, data: UpdateUserInput): Promise<User> {
        const user = await this.getUserById(userId);

        await this.userRepository.update(user, { ...data });

        const userUpdated = this.userRepository.create({ ...user, ...data });

        return userUpdated;

    }
}
