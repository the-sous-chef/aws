# Welcome to your CDK TypeScript project

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

#### Development

```sh
source bootstrap.sh
cdklocal bootstrap --context domainName=thesouschef.local
cdklocal deploy --all --context domainName=thesouschef.local
```

See [cdk localstack](https://github.com/localstack/aws-cdk-local)
