import { Test, TestingModule } from '@nestjs/testing';

import { GroupService } from '@model/group/group.service';

describe('GroupService', () => {
    let service: GroupService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GroupService],
        }).compile();

        service = module.get<GroupService>(GroupService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
