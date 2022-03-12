import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface StackProps extends cdk.StackProps {
    name: string;
    stage: string;
}

export class VPCStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const { name, stage } = props;

        const vpc = new ec2.Vpc(this, `${id}DefaultVpc`, {
            cidr: scope.node.tryGetContext('cidr') || process.env.VPC_CIDR || '10.0.0.0/16',
            natGateways: 1,
            maxAzs: 3,
            subnetConfiguration: [{
                name: `${stage}-private-subnet-1`,
                subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
                cidrMask: 24,
            }, {
                name: `${stage}-public-subnet-1`,
                subnetType: ec2.SubnetType.PUBLIC,
                cidrMask: 24,
            }, {
                name: `${stage}-isolated-subnet-1`,
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                cidrMask: 28,
            }],
        });

        cdk.Aspects.of(vpc).add(new cdk.Tag('Name', `${name}-vpc`));

        for (const subnet of vpc.publicSubnets) {
            cdk.Aspects.of(subnet).add(
                new cdk.Tag(
                    'Name',
                    `${vpc.node.id}-${subnet.node.id.replace(/Subnet[0-9]$/, '')}-${subnet.availabilityZone}`,
                ),
            );
        }

        for (const subnet of vpc.privateSubnets) {
            cdk.Aspects.of(subnet).add(
                new cdk.Tag(
                    'Name',
                    `${vpc.node.id}-${subnet.node.id.replace(/Subnet[0-9]$/, '')}-${subnet.availabilityZone}`,
                ),
            );
        }

        for (const subnet of vpc.isolatedSubnets) {
            cdk.Aspects.of(subnet).add(
                new cdk.Tag(
                    'Name',
                    `${vpc.node.id}-${subnet.node.id.replace(/Subnet[0-9]$/, '')}-${subnet.availabilityZone}`,
                ),
            );
        }

        // eslint-disable-next-line no-new
        new cdk.CfnOutput(this, 'vpcId', {
            value: vpc.vpcId,
            description: 'the ID of the VPC',
        });
    }
}
