// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordStrengthWidth: string = '0%';

  constructor(private router: Router, private authService: AuthService) {}

  onPasswordInput() {
    this.calculatePasswordStrength();
  }

  calculatePasswordStrength() {
    if (!this.password) {
      this.passwordStrengthWidth = '0%';
      return;
    }

    let strength = 0;

    // Panjang password
    if (this.password.length >= 8) strength += 40;
    else if (this.password.length >= 5) strength += 20;

    // Angka
    if (/\d/.test(this.password)) strength += 20;

    // Huruf besar dan kecil
    if (/[a-z]/.test(this.password) && /[A-Z]/.test(this.password)) strength += 20;

    this.passwordStrengthWidth = `${strength}%`;
  }

  getPasswordStrengthClass(): string {
    const width = parseInt(this.passwordStrengthWidth);
    if (width >= 70) return 'strong';
    if (width >= 40) return 'medium';
    return 'weak';
  }

  getPasswordStrengthText(): string {
    const width = parseInt(this.passwordStrengthWidth);
    if (width >= 70) return 'Kuat';
    if (width >= 40) return 'Sedang';
    return 'Lemah';
  }

  isFormValid(): boolean {
    return (
      this.username.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.password === this.confirmPassword &&
      this.password.length >= 3
    );
  }

  register(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    console.log('Register attempt:', this.username);

    if (!this.username || !this.password) {
      alert('Username dan password harus diisi!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Password dan konfirmasi password tidak sama!');
      return;
    }

    if (this.password.length < 3) {
      alert('Password harus minimal 3 karakter!');
      return;
    }

    const success = this.authService.register(this.username, this.password);
    console.log('Register success:', success);

    if (success) {
      alert('Registrasi berhasil! Silakan login.');
      this.router.navigate(['/login']);
    } else {
      alert('Username sudah digunakan!');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
