import * as cdk from '@aws-cdk/core';

import * as cognito from './cognito';
import * as iam from './iam';
import * as vpc from './vpc';

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        iam.deploy(scope);
        cognito.deploy(scope);
        vpc.deploy(scope);
    }
}
