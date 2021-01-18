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

        const user = await this.userRepository.save({
            ...data,
            is_verified: false,
            verification_token: Guid.raw(),
            verification_token_created_at: new Date(),
            verification_token_submissions: 1
        });

        // TODO: gerar contratos dos parâmetros fixados
        const payload: KafkaPayload = {
            payload_id: Guid.raw(),
            message: {
                external_id: user.user_id,
                template: {
                    type: "user.verification-link.v1",
                    params: {
                        verification_token: user.verification_token
                    }
                }
            },
            message_type: "user.verification-link.v1",
            topic_name: "aws.security.fct.user.verification-link.v1"
        };

        this.kafkaService.sendMessage("aws.security.fct.user.verification-link.v1", payload);

        if (!user) {
            throw new InternalServerErrorException("Problema para criar um usuário.");
        }

        return user;
    }

    async updateUser(user_id: string, data: UpdateUserInput): Promise<User> {
        const user = await this.getUserById(user_id);

        return await this.userRepository.save({ ...user, ...data });
    }

    public async resetPassword(email: string): Promise<void> {

        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            const payload: KafkaPayload = {
                payload_id: "",
                message: "",
                message_type: "",
                topic_name: ""
            };

            this.kafkaService.sendMessage("", payload);
        } else {
            // TODO: logar a tentativa falha?
        }
    }

    // public async 
}
