export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In real app, this would be hashed
}

// In-memory user store (resets on server restart)
const users: User[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
  },
];

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export function createUser(data: Omit<User, "id">): User {
  const newUser: User = {
    id: String(users.length + 1),
    ...data,
  };
  users.push(newUser);
  return newUser;
}

export function validateCredentials(
  email: string,
  password: string,
): User | null {
  const user = findUserByEmail(email);
  if (!user || user.password !== password) return null;
  return user;
}
