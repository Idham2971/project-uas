import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Dashboard } from './pages/dashboard/dashboard';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, Dashboard],
    }).compileComponents();
  });

  it('harus membuat aplikasi (app instance)', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`harus memiliki judul 'angular-21-dashboard'`, () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('project-uas');
  });

  it('harus merender sidebar dengan teks logo "Admin Dash"', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo h2')?.textContent).toContain('Admin Dash');
  });

  it('harus mengandung komponen dashboard', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Memeriksa apakah selector <app-dashboard> ada di dalam HTML
    expect(compiled.querySelector('app-dashboard')).not.toBeNull();
  });
});
