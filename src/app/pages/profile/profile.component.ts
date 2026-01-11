import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service'; // Sesuaikan path jika perlu

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isEditing = false;

  // Model data untuk form edit
  editData: Partial<User> = {
    address: '',
    gender: '',
    age: null,
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.user = this.authService.getCurrentUser();

    // Validasi: Jika user null (localStorage kosong/terhapus), baru redirect ke login
    if (!this.user) {
      console.warn('User data not found, redirecting to login...');
      this.router.navigate(['/login']);
    }
  }

  // FIXED: Tambahkan parameter event untuk stop reload
  enableEdit(event?: Event) {
    if (event) {
      event.preventDefault(); // Mencegah reload halaman
      event.stopPropagation(); // Mencegah klik tembus
    }

    if (this.user) {
      this.isEditing = true;
      // Copy data user ke form edit
      this.editData = {
        address: this.user.address || '',
        gender: this.user.gender || '',
        age: this.user.age || null,
      };
    }
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveProfile() {
    if (this.user) {
      this.authService.updateUserProfile({
        address: this.editData.address,
        gender: this.editData.gender,
        age: this.editData.age,
      });

      this.isEditing = false;
      this.loadUser(); // Refresh data di layar
      alert('Profil berhasil diperbarui!');
    }
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.authService.updateProfilePhoto(e.target.result);
        this.loadUser();
      };
      reader.readAsDataURL(file);
    }
  }

  // FIXED: Tambahkan parameter event untuk stop reload
  goBack(event?: Event) {
    if (event) {
      event.preventDefault(); // KUNCI UTAMA: Stop browser reload
      event.stopPropagation();
    }
    this.router.navigate(['/dashboard']);
  }
}
