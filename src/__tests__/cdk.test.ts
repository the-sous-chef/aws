import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';

import { CdkStack } from '..';

test('Infrastructure Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkStack(app, 'InfrastructureStack');
    // THEN

    expectCDK(stack).to(matchTemplate({
        Resources: {},
    }, MatchStyle.EXACT));
});
