export const AUTHENTICATION = process.env.NEXT_PUBLIC_AUTHENTICATION !== 'false';

// true = wipe all local data once per calendar day (for shared demos only)
export const DEMO_RESET = process.env.NEXT_PUBLIC_DEMO_RESET === 'true';