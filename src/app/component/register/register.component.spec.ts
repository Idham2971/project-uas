import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { vi, describe, it, expect, beforeEach, type Mocked } from 'vitest';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: Mocked<AuthService>;
  let router: Mocked<Router>;

  beforeEach(async () => {
    const authServiceMock = { register: vi.fn() };
    const routerMock = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, FormsModule],
    }).compileComponents();

    TestBed.overrideProvider(AuthService, { useValue: authServiceMock });
    TestBed.overrideProvider(Router, { useValue: routerMock });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    
    authService = TestBed.inject(AuthService) as Mocked<AuthService>;
    router = TestBed.inject(Router) as Mocked<Router>;
    fixture.detectChanges();
  });

  it('harus membuat komponen', () => {
    expect(component).toBeTruthy();
  });

  it('harus registrasi sukses jika form valid', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    authService.register.mockReturnValue(true);
    
    component.username = 'tom';
    component.password = 'Pass123';
    component.confirmPassword = 'Pass123';
    component.calculatePasswordStrength(); // Agar valid
    
    component.register();
    expect(authService.register).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});