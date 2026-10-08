export interface User {
  sub: string;
  email: string;
  name?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export interface AdminUser extends User {
  role: "admin";
}
