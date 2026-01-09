import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserKey = 'currentUser';
  private usersKey = 'users';

  constructor() {}

  register(username: string, pass: string): boolean {
    const users = this.getUsers();
    if (users.some((u: any) => u.username === username)) {
      return false;
    }
    // Tambah user baru dengan field photoUrl default null
    const newUser = { username, password: pass, role: 'user', photoUrl: null }; 
    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(username: string, pass: string): boolean {
    const users = this.getUsers();
    const user = users.find((u: any) => u.username === username && u.password === pass);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser() {
    const userStr = localStorage.getItem(this.currentUserKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  getUsers() {
    const usersStr = localStorage.getItem(this.usersKey);
    return usersStr ? JSON.parse(usersStr) : [];
  }

  // Update foto profil (Base64)
  updateProfilePhoto(photoBase64: string): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      // 1. Update sesi saat ini
      currentUser.photoUrl = photoBase64;
      localStorage.setItem(this.currentUserKey, JSON.stringify(currentUser));

      // 2. Update database permanen
      const users = this.getUsers();
      const userIndex = users.findIndex((u: any) => u.username === currentUser.username);
      if (userIndex !== -1) {
        users[userIndex].photoUrl = photoBase64;
        localStorage.setItem(this.usersKey, JSON.stringify(users));
      }
    }
  }
}