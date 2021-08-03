import * as Sentry from '@sentry/react';

const LogError = (error: any, info: any) => {
  Sentry.captureException(error, {
    extra: info
  });
};

export default { LogError };
