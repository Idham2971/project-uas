import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard as DashboardComponent } from './dashboard';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent] // Standalone diimport di sini
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
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
});
