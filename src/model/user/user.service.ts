import {
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { Repository } from 'typeorm';
import { DateTime } from "luxon";

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

        const payload: KafkaPayload = {
            payload_id: Guid.raw(),
            topic_name: "local.security.fct.user.verification-link.v1",
            message_type: "user.verification-link.v1",
            message: {
                external_id: user.user_id,
                template: {
                    template_id: "user.verification-link.v1",
                    parameters: {
                        route: "verification_link",
                        verification_token: user.verification_token
                    }
                }
            }
        };

        this.kafkaService.sendMessage("local.security.fct.user.verification-link.v1", payload);

        if (!user) {
            throw new InternalServerErrorException("Problema para criar um usuário.");
        }

        return user;
    }

    async updateUser(user_id: string, data: UpdateUserInput): Promise<User> {
        const user = await this.getUserById(user_id);

        return await this.userRepository.save({ ...user, ...data });
    }

    public async recover(email: string): Promise<void> {

        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            await this.userRepository.save({
                ...user,
                reset_password_token: Guid.raw(),
                reset_password_created_at: new Date()
            });

            const payload: KafkaPayload = {
                payload_id: Guid.raw(),
                topic_name: "local.security.fct.user.reset-password.v1",
                message_type: "user.reset-password.v1",
                message: {
                    external_id: user.user_id,
                    template: {
                        template_id: "user.reset-password.v1",
                        parameters: {
                            route: "reset_password_link",
                            reset_password_token: user.reset_password_token
                        }
                    }
                }
            };

            this.kafkaService.sendMessage("local.security.fct.user.reset-password.v1", payload);
        }
    }

    public async updatePassword(reset_password_token: string, password: string): Promise<void> {
        const user = await this.userRepository.findOne({
            where: {
                reset_password_token
            }
        });

        if (!user) {
            throw new InternalServerErrorException("Token inválido.");
        }

        let expires_at = DateTime.fromJSDate(user.reset_password_created_at).plus({ hours: 12 });
        let current = new DateTime();

        if (expires_at > current) {
            throw new InternalServerErrorException("Token expirado, favor resetar a senha novamente.");
        }

        await this.userRepository.save({
            ...user,
            password,
            reset_password_token: null,
            reset_password_created_at: null
        });
    }
}
