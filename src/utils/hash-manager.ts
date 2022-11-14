import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10;

class HashManager {
  async getHash(plainPassword: string) : Promise<string> {
    const passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return passwordHash;
  }

  async compareHash(plainPassword: string, hash: string) : Promise<boolean> {
    const compareResult = await bcrypt.compare(plainPassword, hash)
    return compareResult;
  }
}

export { HashManager };