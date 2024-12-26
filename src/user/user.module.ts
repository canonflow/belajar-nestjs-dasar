import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {
    Connection,
    MongoDBConnection,
    MySQLConnection,
} from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import {
    createUserRepository,
    UserRepository,
} from './user-repository/user-repository';
import * as process from 'process';

@Module({
    controllers: [UserController],
    providers: [
        // Standard Provider
        UserService,
        {
            // Class Provider
            provide: Connection,
            useClass:
                process.env.DATABASE == 'mysql'
                    ? MySQLConnection
                    : MongoDBConnection,
        },
        {
            // Value Provider
            provide: MailService,
            useValue: mailService,
        },
        {
            // Alias Provider
            provide: 'EmailService',
            useExisting: MailService,
        },
        {
            // Factory Provider (from a function / method that requires other providers)
            provide: UserRepository,
            useFactory: createUserRepository,
            inject: [Connection],
        },
    ],
})
export class UserModule {}
