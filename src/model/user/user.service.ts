import {
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { Repository } from 'typeorm';

import { KafkaService } from '@common/kafka/kafka.service';
import { KafkaPayload } from '@common/kafka/kafka.message';

import { User } from '@model/user/user.entity';
import { CreateUserInput } from '@model/user/odt/create-user.input';
import { UpdateUserInput } from '@model/user/odt/update-user.input';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private kafkaService: KafkaService
    ) { }

    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(user_id: string): Promise<User> {
        const user = await this.userRepository.findOne(user_id);

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

        const user = this.userRepository.create({
            ...data,
            is_verified: false,
            verification_token: Guid.raw(),
            verification_token_created_at: new Date(),
            verification_token_submissions: 1
        });

        const userSaved = await this.userRepository.save(user);

        const payload: KafkaPayload = {
            payload_id: user.verification_token,
            message: {
                template_code: "user.verification-link.v1",
                id: ""
            },
            message_type: "user.verification-link.v1",
            topic_name: "aws.security.fct.user.verification-link.v1"
        };

        this.kafkaService.sendMessage("aws.security.fct.user.verification-link.v1", payload);

        if (!userSaved) {
            throw new InternalServerErrorException("Problema para criar um usuário.");
        }

        return userSaved;
    }

    async updateUser(user_id: string, data: UpdateUserInput): Promise<User> {
        const user = await this.getUserById(user_id);

        await this.userRepository.update(user, { ...data });

        const userUpdated = this.userRepository.create({ ...user, ...data });

        return userUpdated;
    }
}
