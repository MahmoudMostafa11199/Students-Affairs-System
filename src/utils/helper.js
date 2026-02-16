import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const generateId = (prefix) => {
  const shortId = uuidv4().substring(0, 8);
  return `${prefix}-${shortId}`;
};

// Throw error if res.ok == false
export const throwErrorRes = (message) => {
  throw new Error(message);
};

// Check valid email
export function isEmailAddress(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailPattern.test(email);
}
