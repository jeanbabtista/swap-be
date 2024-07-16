type HandlerFunction = (error: Error, ctx: any) => void;

// https://gist.githubusercontent.com/omirobarcelo/e128f15a335fb0d73413d58750e906ee/raw/d4b3a5bb1beb2f6e7149b0232466bdc725de02a6/catch_decorator_method.ts
export const Catch = (errorType: any, handler: HandlerFunction): any => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // Save a reference to the original method
    const originalMethod = descriptor.value;

    // Rewrite original method with try/catch wrapper
    descriptor.value = function (...args: any[]) {
      try {
        const result = originalMethod.apply(this, args);

        // Check if method is asynchronous
        if (result && result instanceof Promise) {
          // Return promise
          return result.catch((error: any) => {
            _handleError(this, errorType, handler, error);
          });
        }

        // Return actual result
        return result;
      } catch (error) {
        _handleError(this, errorType, handler, error);
      }
    };

    return descriptor;
  };
};

export const CatchAll = (handler: HandlerFunction): any =>
  Catch(Error, handler);

function _handleError(
  ctx: any,
  errorType: any,
  handler: HandlerFunction,
  error: Error,
) {
  // Check if error is instance of given error type
  if (typeof handler === 'function' && error instanceof errorType) {
    // Run handler with error object and class context
    handler.call(null, error, ctx);
  } else {
    // Throw error further
    // Next decorator in chain can catch it
    throw error;
  }
}
