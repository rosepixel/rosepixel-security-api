import { Test, TestingModule } from '@nestjs/testing';
import { ClaimResolver } from './claim.resolver';

describe('ClaimResolver', () => {
  let resolver: ClaimResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaimResolver],
    }).compile();

    resolver = module.get<ClaimResolver>(ClaimResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
