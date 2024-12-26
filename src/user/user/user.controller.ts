import {
    Controller,
    Get,
    Header,
    HttpCode,
    HttpRedirectResponse,
    Inject,
    Param,
    Post,
    Query,
    Redirect,
    Req,
    Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';

@Controller('/api/users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly connection: Connection,
        private readonly mailService: MailService,
        private readonly userRepository: UserRepository,
        @Inject('EmailService') private readonly emailService: MailService,
    ) {}

    @Get('/connection')
    async getConnection(): Promise<string> {
        this.userRepository.save();
        this.mailService.send();
        this.emailService.send();
        return this.connection.getName();
    }

    @Get('/hello')
    async sayHello(@Query('name') name: string): Promise<string> {
        return this.userService.sayHello(name);
    }

    @Get('/view/hello')
    viewHello(@Query('name') name: string, @Res() response: Response) {
        return response.render('index.html', {
            title: 'Template Engine',
            name: name,
        });
    }

    @Get('/set-cookie')
    setCookie(@Query('name') name: string, @Res() response: Response) {
        response.cookie('name', name);
        response.status(200).send('Successfully set cookie');
    }

    @Get('/get-cookie')
    getCookie(@Req() request: Request): string {
        return request.cookies['name'];
    }

    @Get('/sample-response')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    sampleResponse(): Record<string, string> {
        return {
            data: 'Hello World!',
        };
    }

    @Get('/redirect')
    @Redirect()
    redirect(): HttpRedirectResponse {
        return {
            url: '/api/users/sample-response',
            statusCode: 301,
        };
    }

    @Get('/:id')
    getById(@Param('id') id: string): string {
        // return `GET ${request.params.id}`;
        return `GET ${id}`;
    }

    @Post()
    post(): string {
        return 'POST';
    }

    @Get('/sample')
    get(): string {
        return 'GET';
    }
}
