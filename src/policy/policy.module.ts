import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyResolver } from './policy.resolver';

@Module({
  providers: [PolicyService, PolicyResolver]
})
export class PolicyModule {}
