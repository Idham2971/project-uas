// src/app/components/login/login.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    // Create mocks
    const authServiceMock = {
      login: jest.fn(),
      getUsers: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty username and password initially', () => {
    expect(component.username).toBe('');
    expect(component.password).toBe('');
  });

  describe('login method', () => {
    it('should show alert when username or password is empty', () => {
      window.alert = jest.fn();

      component.username = '';
      component.password = '';
      component.login();

      expect(window.alert).toHaveBeenCalledWith('Username dan password harus diisi!');
      expect(authService.login).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should call authService.login with correct credentials', () => {
      window.alert = jest.fn();
      authService.login.mockReturnValue(true);

      component.username = 'admin';
      component.password = 'admin';
      component.login();

      expect(authService.login).toHaveBeenCalledWith('admin', 'admin');
    });

    it('should navigate to dashboard on successful login', () => {
      authService.login.mockReturnValue(true);
      window.alert = jest.fn();

      component.username = 'admin';
      component.password = 'admin';
      component.login();

      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should show alert on failed login', () => {
      authService.login.mockReturnValue(false);
      window.alert = jest.fn();

      component.username = 'wrong';
      component.password = 'wrong';
      component.login();

      expect(window.alert).toHaveBeenCalledWith('Login gagal! Username atau password salah.');
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('goToRegister method', () => {
    it('should navigate to register page', () => {
      component.goToRegister();
      expect(router.navigate).toHaveBeenCalledWith(['/register']);
    });
  });

  describe('debugUsers method', () => {
    it('should call getUsers and log result', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const mockUsers = [{ username: 'admin', password: 'admin' }];
      authService.getUsers.mockReturnValue(mockUsers);

      component.debugUsers();

      expect(consoleSpy).toHaveBeenCalledWith('Current users:', mockUsers);
      expect(authService.getUsers).toHaveBeenCalled();
    });
  });
});
