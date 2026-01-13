import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi, describe, it, expect, beforeEach, type Mocked } from 'vitest';
import { AboutComponent } from './about';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let router: Mocked<Router>;

  beforeEach(async () => {
    const routerMock = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AboutComponent], // standalone component
    }).compileComponents();

    TestBed.overrideProvider(Router, { useValue: routerMock });

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router) as Mocked<Router>;

    fixture.detectChanges();
  });

  it('harus membuat komponen', () => {
    expect(component).toBeTruthy();
  });

  it('harus kembali ke dashboard saat goBack dipanggil', () => {
    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
