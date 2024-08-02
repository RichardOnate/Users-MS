import { hash } from 'bcrypt';

export class StringUtils {
  static async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  static capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
