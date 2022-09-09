import * as ecr from 'aws-cdk-lib/aws-ecr';
import {
    CfnOutput, Stack, StackProps as CdkStackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class EcrStack extends Stack {
    repository: ecr.Repository;

    constructor(scope: Construct, id: string, props: CdkStackProps) {
        super(scope, id, props);

        this.repository = new ecr.Repository(this, `${id}ECR`, {
            imageScanOnPush: true,
            repositoryName: 'thesouschef-ecr',
        });

        // eslint-disable-next-line no-new
        new CfnOutput(this, 'ECRRepositoryARN', { value: this.repository.repositoryArn });
    }
}
