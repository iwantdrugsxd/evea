// Suppress hydration warnings in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: Text content did not match') ||
      args[0].includes('Warning: Expected server HTML to contain') ||
      args[0].includes('Warning: Hydration failed') ||
      args[0].includes('fdprocessedid')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}
