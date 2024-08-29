#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { capitalize } from "utils/capitalize";
import { VPCStack } from "lib/vpc";
import { Route53Stack } from "lib/route53";

const app = new cdk.App();
const domainName =
  app.node.tryGetContext("domainName") || process.env.DOMAIN_NAME;
const stage =
  app.node.tryGetContext("stage") || process.env.STAGE || "development";
const id = `${capitalize(stage)}Cloud`;
const props = {
  stage,
  env: {
    account: app.node.tryGetContext("accountId") || process.env.AWS_ACCOUNT_ID,
    region: app.node.tryGetContext("region") || process.env.AWS_DEFAULT_REGION,
  },
  name: `thesouschef-${stage}`,
};

// eslint-disable-next-line no-new
new VPCStack(app, `${id}VPCStack`, props);

// eslint-disable-next-line no-new
new Route53Stack(app, `${id}Route53Stack`, { ...props, domainName });
