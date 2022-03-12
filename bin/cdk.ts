#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CoreStack } from '../lib/stack';
import { capitalize } from '../utils/capitalize';

const app = new cdk.App();
const domainName = app.node.tryGetContext('domainName') || process.env.DOMAIN_NAME;
const stage = app.node.tryGetContext('stage') || process.env.STAGE || 'development';

// eslint-disable-next-line no-new
new CoreStack(app, `${capitalize(stage)}Cloud`, {
    domainName,
    stage,
    env: {
        account: app.node.tryGetContext('accountId') || process.env.AWS_ACCOUNT_ID,
        region: app.node.tryGetContext('region') || process.env.AWS_DEFAULT_REGION,
    },
    name: `thesouschef-${stage}`,
});
