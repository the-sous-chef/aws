#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { CdkStack } from '../src';

const app = new cdk.App();

// eslint-disable-next-line no-new
new CdkStack(app, 'InfrastructureStack', {
    env: { account: '040663841500', region: 'us-east-1' },
});
