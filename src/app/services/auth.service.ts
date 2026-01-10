import { Injectable } from '@angular/core';

export interface User {
  username: string;
  password?: string;
  role: string;
  photoUrl?: string | null;
  address?: string | null; // Field Baru
  gender?: string | null; // Field Baru
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
    // Inisialisasi user dengan field baru kosong
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

  // Method baru: Update Data Profil Lengkap
  updateUserProfile(updatedData: Partial<User>): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      // 1. Gabungkan data lama dengan data baru
      const newUserState = { ...currentUser, ...updatedData };

      // 2. Simpan di session (currentUser)
      localStorage.setItem(this.currentUserKey, JSON.stringify(newUserState));

      // 3. Simpan di database (users array)
      const users = this.getUsers();
      const userIndex = users.findIndex((u: User) => u.username === currentUser.username);
      if (userIndex !== -1) {
        // Kita merge juga di database agar password tidak hilang jika updatedData tidak bawa password
        users[userIndex] = { ...users[userIndex], ...updatedData };
        localStorage.setItem(this.usersKey, JSON.stringify(users));
      }
    }
  }

  // Method lama (bisa tetap dipakai atau diganti logicnya pakai updateUserProfile)
  updateProfilePhoto(photoBase64: string): void {
    this.updateUserProfile({ photoUrl: photoBase64 });
  }
}
