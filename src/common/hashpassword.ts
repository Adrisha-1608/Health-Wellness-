import bcrypt from 'bcrypt';

export const hashPassword = async (plainText: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(plainText, saltRounds);
};

export const comparePasswords = async (
  plainText: string,
  hashed: string
): Promise<boolean> => {
  return bcrypt.compare(plainText, hashed);
};
