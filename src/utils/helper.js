import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const generateId = (prefix) => {
  const shortId = uuidv4().substring(0, 8);
  return `${prefix}-${shortId}`;
};
