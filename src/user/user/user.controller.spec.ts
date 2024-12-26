import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    it('should can say hello', async () => {
        const response = await controller.sayHello('Nathan');
        expect(response).toBe('Hello Nathan');
    });

    it('should can get view', async () => {
        const responses = httpMock.createResponse();
        controller.viewHello('Nathan', responses);

        expect(responses._getRenderView()).toBe('index.html');
        expect(responses._getRenderData()).toEqual({
            name: 'Nathan',
            title: 'Template Engine',
        });
    });
});
