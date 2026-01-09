import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Dashboard } from './dashboard';
import { AuthService } from '../../services/auth.service';
import { vi, describe, it, expect, beforeEach, type Mocked } from 'vitest';

describe('DashboardComponent', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let authService: Mocked<AuthService>;
  let router: Mocked<Router>;

  beforeEach(async () => {
    const authServiceMock = {
      logout: vi.fn(),
      getCurrentUser: vi.fn().mockReturnValue({ username: 'admin', role: 'admin', photoUrl: null }),
      updateProfilePhoto: vi.fn(),
    };
    const routerMock = { navigate: vi.fn() };

    await TestBed.configureTestingModule({ imports: [Dashboard] }).compileComponents();
    TestBed.overrideProvider(AuthService, { useValue: authServiceMock });
    TestBed.overrideProvider(Router, { useValue: routerMock });

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as Mocked<AuthService>;
    router = TestBed.inject(Router) as Mocked<Router>;
    fixture.detectChanges();
  });

  it('harus membuat dashboard', () => {
    expect(component).toBeTruthy();
  });

  it('harus memanggil updateProfilePhoto saat file diupload', () => {
    // 1. Buat Mock Object untuk Logic
    const mockReader = {
      readAsDataURL: vi.fn(),
      onload: null as any,
      result: 'base64'
    };

    // 2. Buat Mock Class untuk Constructor FileReader
    class MockFileReader {
      readAsDataURL = mockReader.readAsDataURL;
      // PERBAIKAN DI SINI: Gunakan ': any' agar TS tahu ini bisa jadi function
      onload: any = null; 
      result = 'base64';
      
      constructor() {
        // Hubungkan mockReader luar agar kita bisa trigger dari luar
        mockReader.onload = (e: any) => {
          if (this.onload) {
            this.onload(e);
          }
        };
      }
    }

    // 3. Override window.FileReader
    vi.spyOn(window, 'FileReader').mockImplementation(() => new MockFileReader() as any);

    // 4. Trigger upload di component
    component.onFileSelected({ target: { files: [new Blob()] } });

    // 5. Manual trigger onload dari mockReader yang kita pegang
    if (mockReader.onload) {
      mockReader.onload({ target: { result: 'base64' } });
    }

    // 6. Assert
    expect(authService.updateProfilePhoto).toHaveBeenCalledWith('base64');
  });
});