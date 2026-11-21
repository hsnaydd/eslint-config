interface User {
  id: number;
  name: string;
  email?: string;
}

export const DEFAULT_NAME = 'Anonymous';

export function getDisplayName(user: User): string {
  return user.name || DEFAULT_NAME;
}

export function findUser(users: User[], id: number): User | undefined {
  return users.find((user) => user.id === id);
}

export class UserStore {
  private readonly users = new Map<number, User>();

  add(user: User): void {
    this.users.set(user.id, user);
  }

  get size(): number {
    return this.users.size;
  }
}
