import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  // State untuk mode edit
  isEditing = false;

  // Model untuk form edit (terpisah dari data asli supaya bisa cancel)
  editData: Partial<User> = {
    address: '',
    gender: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  // Masuk ke Mode Edit
  enableEdit() {
    if (this.user) {
      this.isEditing = true;
      // Salin data saat ini ke form model
      this.editData = {
        address: this.user.address || '',
        gender: this.user.gender || '',
      };
    }
  }

  // Batal Edit
  cancelEdit() {
    this.isEditing = false;
  }

  // Simpan Perubahan
  saveProfile() {
    if (this.user) {
      this.authService.updateUserProfile({
        address: this.editData.address,
        gender: this.editData.gender,
      });

      this.isEditing = false;
      this.loadUser(); // Refresh tampilan
      alert('Profil berhasil diperbarui!');
    }
  }

  // Ganti Foto (Reuse logic dari dashboard)
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

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
