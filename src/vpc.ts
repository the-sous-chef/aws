import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

function tagSubnets(subnets: ec2.ISubnet[], tagName: string, tagValue: (subnet: ec2.ISubnet) => string): void {
    for (const subnet of subnets) {
        cdk.Aspects.of(subnet).add(new cdk.Tag(tagName, tagValue(subnet)));
    }
}

export const deploy = (scope: cdk.Construct): void => {
    const vpc = new ec2.Vpc(scope, 'Vpc', {
        cidr: '10.0.0.0/16',
        maxAzs: 3,
        natGateways: 0,
        // TODO convert one public to private and add NAT
        subnetConfiguration: [
            {
                cidrMask: 24,
                name: 'Public',
                subnetType: ec2.SubnetType.PUBLIC,
            }, {
                cidrMask: 24,
                name: 'Isolated',
                subnetType: ec2.SubnetType.ISOLATED,
            },
        ],
    });

    cdk.Aspects.of(vpc).add(new cdk.Tag('Name', 'default-vpc'));

    tagSubnets(vpc.privateSubnets, 'Name', (subnet) => (`${vpc.node.id}-${subnet.node.id.replace(/Subnet[0-9]$/, '')}-${subnet.availabilityZone}`));
    tagSubnets(vpc.publicSubnets, 'Name', (subnet) => (`${vpc.node.id}-${subnet.node.id.replace(/Subnet[0-9]$/, '')}-${subnet.availabilityZone}`));
    tagSubnets(vpc.isolatedSubnets, 'Name', (subnet) => (`${vpc.node.id}-${subnet.node.id.replace(/Subnet[0-9]$/, '')}-${subnet.availabilityZone}`));
};
