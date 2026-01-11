import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products';
import { Router, ActivatedRoute, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    // 1. Mock AuthService
    const authServiceMock = {
      getCurrentUser: vi.fn().mockReturnValue({ username: 'user', role: 'user' }),
      logout: vi.fn(),
    };

    // 2. Mock Router
    const routerMock = {
      navigate: vi.fn(),
      createUrlTree: vi.fn().mockReturnValue({
        toString: () => '/mock-url',
      } as unknown as UrlTree),
      serializeUrl: vi.fn().mockReturnValue('/mock-url'),
      events: of(null),
    };

    await TestBed.configureTestingModule({
      imports: [ProductsComponent], // Standalone component masuk imports
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {}, // Mock kosong untuk ActivatedRoute
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});