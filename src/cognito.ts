/* eslint-disable no-new */
import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as iam from '@aws-cdk/aws-iam';

export const deploy = (scope: cdk.Construct): void => {
    const userPool = new cognito.UserPool(scope, 'UserPool', {
        selfSignUpEnabled: true,
        autoVerify: { email: true },
        signInAliases: { email: true },
    });

    const userPoolClient = new cognito.UserPoolClient(scope, 'UserPoolClient', {
        userPool,
        generateSecret: false,
    });

    // @ts-expect-error
    const identityPool = new cognito.CfnIdentityPool(scope, 'IdentityPool', {
        allowUnauthenticatedIdentities: true,
        cognitoIdentityProviders: [
            {
                clientId: userPoolClient.userPoolClientId,
                providerName: userPool.userPoolProviderName,
            },
        ],
    });

    const role = new iam.Role(scope, 'CognitoDefaultAuthenticatedRole', {
        assumedBy: new iam.FederatedPrincipal(
            'cognito-identity.amazonaws.com',
            {
                StringEquals: {
                    'cognito-identity.amazonaws.com:aud': identityPool.ref,
                },
                'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'authenticated',
                },
            },
            'sts:AssumeRoleWithWebIdentity',
        ),
    });

    role.addToPolicy(
        new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
                'mobileanalytics:PutEvents',
                'cognito-sync:*',
                'cognito-identity:*',
            ],
            resources: ['*'],
        }),
    );

    // @ts-expect-error
    new cognito.CfnIdentityPoolRoleAttachment(scope, 'IdentityPoolRoleAttachment', {
        identityPoolId: identityPool.ref,
        roles: { authenticated: role.roleArn },
    });

    // Export values
    new cdk.CfnOutput(scope, 'UserPoolId', {
        value: userPool.userPoolId,
    });

    new cdk.CfnOutput(scope, 'UserPoolClientId', {
        value: userPoolClient.userPoolClientId,
    });

    new cdk.CfnOutput(scope, 'IdentityPoolId', {
        value: identityPool.ref,
    });
};
