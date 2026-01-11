import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, UrlTree } from '@angular/router';
import { Dashboard } from './dashboard';
import { AuthService } from '../../services/auth.service';
import { vi, describe, it, expect, beforeEach, type Mocked } from 'vitest';
import { of } from 'rxjs';

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

    const routerMock = {
      navigate: vi.fn(),
      createUrlTree: vi.fn().mockReturnValue({
        toString: () => '/mock-url',
      } as unknown as UrlTree),
      serializeUrl: vi.fn().mockReturnValue('/mock-url'),
      events: of(null),
    };

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

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
    const mockReader = {
      readAsDataURL: vi.fn(),
      onload: null as any,
      result: 'base64',
    };

    class MockFileReader {
      readAsDataURL = mockReader.readAsDataURL;
      onload: any = null;
      result = 'base64';

      constructor() {
        mockReader.onload = (e: any) => {
          if (this.onload) {
            this.onload(e);
          }
        };
      }
    }

    vi.spyOn(window, 'FileReader').mockImplementation(MockFileReader as any);

    component.onFileSelected({ target: { files: [new Blob()] } });

    if (mockReader.onload) {
      mockReader.onload({ target: { result: 'base64' } });
    }

    expect(authService.updateProfilePhoto).toHaveBeenCalledWith('base64');
  });
});
