import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Dashboard } from './dashboard';
import { AuthService } from '../../services/auth.service';

describe('DashboardComponent', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const authServiceMock = {
      logout: jest.fn(),
      getCurrentUser: jest.fn().mockReturnValue({ username: 'admin', role: 'admin' }),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Dashboard],
    }).compileComponents();

    TestBed.overrideProvider(AuthService, { useValue: authServiceMock });
    TestBed.overrideProvider(Router, { useValue: routerMock });

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    fixture.detectChanges();
  });

  it('harus membuat dashboard', () => {
    expect(component).toBeTruthy();
  });

  it('harus merender 3 kartu statistik dari Signal', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.card');
    expect(cards.length).toBe(3);
  });

  it('harus menampilkan "Revenue" pada kartu pertama', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstCardLabel = compiled.querySelector('.card .label');
    expect(firstCardLabel?.textContent).toContain('Revenue');
  });

  it('harus menampilkan username pengguna di header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const welcomeText = compiled.querySelector('.welcome-text');
    expect(welcomeText?.textContent).toContain('Selamat datang');
  });

  it('harus memanggil logout saat tombol logout diklik', () => {
    const logoutBtn = fixture.nativeElement.querySelector('.logout-btn');
    logoutBtn.click();

    expect(authService.logout).toHaveBeenCalled();
  });

  it('harus menampilkan role pengguna', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const userRole = compiled.querySelector('.user-role');
    expect(userRole?.textContent).toContain('Administrator');
  });
});
