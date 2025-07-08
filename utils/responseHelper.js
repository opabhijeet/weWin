export const success = (data) => ({ success: true, data });
export const failure = (msg) => ({ success: false, error: msg });