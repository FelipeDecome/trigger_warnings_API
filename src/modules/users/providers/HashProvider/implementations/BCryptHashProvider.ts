import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string, salt?: string): Promise<string> {
    return hash(payload, salt || 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;
