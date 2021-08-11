# AWS S3 JS SDK v3 Time Skew Issue

Steps to reproduce:

1. Clone this repository
1. Install dependencies `yarn` or `npm install`
1. Change values in `.env` file and add your S3 credentials
1. Set your system time to something in the past
1. Execute `yarn start`
1. You will see the error below, meanwhile the timeskew should be auto-corrected as stated in the SDK, see https://github.com/aws/aws-sdk-js-v3/blob/eae65cded5e703306346bdbd1b5de9d23050054a/UPGRADING.md#client-constructors

    Quote:

    _"v2: Whether to apply a clock skew correction and retry requests that fail because of an skewed client clock._

    _v3: Deprecated. SDK always applies a clock skew correction."_

    Expected Error Log:
    ```bash
    /node_modules/@aws-sdk/client-s3/dist/cjs/protocols/Aws_restXml.js:8254
        return Promise.reject(Object.assign(new Error(message), response));
                                            ^

    RequestTimeTooSkewed: The difference between the request time and the current time is too large.
        at deserializeAws_restXmlPutObjectCommandError (/Users/kevin/workspace/s3-timeskew-middleware/node_modules/@aws-sdk/client-s3/dist/cjs/protocols/Aws_restXml.js:8254:41)
        at processTicksAndRejections (node:internal/process/task_queues:96:5)
        at async /Users/kevin/workspace/s3-timeskew-middleware/node_modules/@aws-sdk/middleware-serde/dist/cjs/deserializerMiddleware.js:6:20
        at async /Users/kevin/workspace/s3-timeskew-middleware/node_modules/@aws-sdk/middleware-signing/dist/cjs/middleware.js:12:24
        at async StandardRetryStrategy.retry (/Users/kevin/workspace/s3-timeskew-middleware/node_modules/@aws-sdk/middleware-retry/dist/cjs/StandardRetryStrategy.js:51:46)
        at async /Users/kevin/workspace/s3-timeskew-middleware/node_modules/@aws-sdk/middleware-logger/dist/cjs/loggerMiddleware.js:6:22 {
      Code: 'RequestTimeTooSkewed',
      RequestTime: '20210811T184802Z',
      ServerTime: '2021-08-11T21:48:05Z',
      MaxAllowedSkewMilliseconds: '900000',
      RequestId: 'G3KHP62JCKY7FJD3',
      HostId: 'zkoptY1H2A60rawJfQmi6cklZncxQALwsQnLYxr8eX+2qmN0FNHYdbZySqEpkzF6JjKq6T+5i9E=',
      '$fault': 'client',
      '$metadata': {
        httpStatusCode: 403,
        requestId: undefined,
        extendedRequestId: 'zkoptY1H2A60rawJfQmi6cklZncxQALwsQnLYxr8eX+2qmN0FNHYdbZySqEpkzF6JjKq6T+5i9E=',
        cfId: undefined,
        attempts: 5,
        totalRetryDelay: 1068
      }
    }
    error Command failed with exit code 1.
    ```

