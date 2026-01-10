import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { vi, describe, it, expect, beforeEach, type Mocked } from 'vitest';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: Mocked<AuthService>;
  let router: Mocked<Router>;

  // Mock User Data
  const mockUser = {
    username: 'tom',
    role: 'user',
    photoUrl: null,
    address: 'Jl. Lama No. 1',
    gender: 'Laki-laki',
  };

  beforeEach(async () => {
    const authServiceMock = {
      getCurrentUser: vi.fn().mockReturnValue(mockUser),
      updateUserProfile: vi.fn(),
      updateProfilePhoto: vi.fn(),
    };

    const routerMock = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ProfileComponent, FormsModule],
    }).compileComponents();

    TestBed.overrideProvider(AuthService, { useValue: authServiceMock });
    TestBed.overrideProvider(Router, { useValue: routerMock });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as Mocked<AuthService>;
    router = TestBed.inject(Router) as Mocked<Router>;

    fixture.detectChanges();
  });

  it('harus membuat komponen', () => {
    expect(component).toBeTruthy();
  });

  it('harus memuat data user saat init', () => {
    expect(component.user).toEqual(mockUser);
    expect(component.isEditing).toBe(false);
  });

  it('harus masuk mode edit saat tombol Edit ditekan', () => {
    component.enableEdit();
    expect(component.isEditing).toBe(true);
    // Data form harus terisi data user saat ini
    expect(component.editData.address).toBe('Jl. Lama No. 1');
    expect(component.editData.gender).toBe('Laki-laki');
  });

  it('harus menyimpan data profil baru', () => {
    // 1. Masuk mode edit
    component.enableEdit();

    // 2. Ubah data di form
    component.editData.address = 'Jl. Baru No. 99';
    component.editData.gender = 'Perempuan';

    // 3. Simpan
    // Mock window.alert agar tidak mengganggu test
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    component.saveProfile();

    // 4. Assert service dipanggil
    expect(authService.updateUserProfile).toHaveBeenCalledWith({
      address: 'Jl. Baru No. 99',
      gender: 'Perempuan',
    });

    // 5. Kembali ke mode view
    expect(component.isEditing).toBe(false);
  });

  it('harus membatalkan edit dan kembali ke mode view', () => {
    component.enableEdit();
    component.editData.address = 'Data Ngawur';

    component.cancelEdit();

    expect(component.isEditing).toBe(false);
    // Data asli di component.user tidak boleh berubah
    expect(component.user?.address).toBe('Jl. Lama No. 1');
  });
});
