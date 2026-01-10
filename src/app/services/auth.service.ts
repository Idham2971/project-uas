import { Injectable } from '@angular/core';

export interface User {
  username: string;
  password?: string;
  role: string;
  photoUrl?: string | null;
  address?: string | null;
  gender?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserKey = 'currentUser';
  private usersKey = 'users';

  constructor() {}

  register(username: string, pass: string): boolean {
    const users = this.getUsers();
    if (users.some((u: User) => u.username === username)) {
      return false;
    }

    const newUser: User = {
      username,
      password: pass,
      role: 'user',
      photoUrl: null,
      address: null,
      gender: null,
    };

    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(username: string, pass: string): boolean {
    const users = this.getUsers();
    const user = users.find((u: User) => u.username === username && u.password === pass);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.currentUserKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  getUsers(): User[] {
    const usersStr = localStorage.getItem(this.usersKey);
    return usersStr ? JSON.parse(usersStr) : [];
  }

  // Update Data Profil Lengkap
  updateUserProfile(updatedData: Partial<User>): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      // 1. Update sesi login saat ini
      const newUserState = { ...currentUser, ...updatedData };
      localStorage.setItem(this.currentUserKey, JSON.stringify(newUserState));

      // 2. Update database permanen (array users)
      const users = this.getUsers();
      const userIndex = users.findIndex((u: User) => u.username === currentUser.username);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        localStorage.setItem(this.usersKey, JSON.stringify(users));
      }
    }
  }

  // Update Foto Profil (Helper)
  updateProfilePhoto(photoBase64: string): void {
    this.updateUserProfile({ photoUrl: photoBase64 });
  }
}
