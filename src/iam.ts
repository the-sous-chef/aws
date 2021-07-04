import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as sm from '@aws-cdk/aws-secretsmanager';

export const deploy = (scope: cdk.Construct): void => {
    const auth0Secrets = sm.Secret.fromSecretAttributes(scope, 'Auth0Secrets', {
        secretCompleteArn: `arn:aws:secretsmanager:${cdk.Stack.of(scope).region}:${cdk.Stack.of(scope).account}:secret:auth0-09WghP`,
    });

    const auth0SecretValues = auth0Secrets.secretValue.toJSON();

    // eslint-disable-next-line no-new
    new iam.OpenIdConnectProvider(scope, 'Auth0', {
        clientIds: [auth0SecretValues.clientId],
        url: auth0SecretValues.domain,
    });
};
