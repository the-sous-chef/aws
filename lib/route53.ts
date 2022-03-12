import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface StackProps extends cdk.StackProps {
    domainName: string;
    name: string;
    stage: string;
}

export class Route53Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const { domainName } = props;

        const hostedZone = new route53.HostedZone(this, `${id}HostedZone`, {
            zoneName: domainName,

        });

        // eslint-disable-next-line no-new
        new acm.Certificate(this, `${id}Certificate`, {
            domainName,
            subjectAlternativeNames: [`*.${domainName}`],
            validation: acm.CertificateValidation.fromDns(hostedZone),
        });
    }
}
