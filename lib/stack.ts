import { Stack, StackProps as CdkStackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EcrStack } from './ecr';
import { Route53Stack } from './route53';
import { VPCStack } from './vpc';

export interface StackProps extends CdkStackProps {
    domainName: string;
    name: string;
    stage: string;
}

export class CoreStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        // eslint-disable-next-line no-new
        new VPCStack(scope, `${id}VPCStack`, props);

        // eslint-disable-next-line no-new
        new Route53Stack(scope, `${id}Route53Stack`, props);

        // eslint-disable-next-line no-new
        new EcrStack(scope, `${id}EcrStack`, props);
    }
}
