import { Test, TestingModule } from '@nestjs/testing';

import { PolicyResolver } from '@model/policy/policy.resolver';

describe('PolicyResolver', () => {
    let resolver: PolicyResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PolicyResolver],
        }).compile();

        resolver = module.get<PolicyResolver>(PolicyResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
