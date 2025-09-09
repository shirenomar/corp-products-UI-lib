import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppDropdownMenuComponent } from './app-dropdown-menu.component';

describe('AppDropdownMenuComponent', () => {
  let component: AppDropdownMenuComponent;
  let fixture: ComponentFixture<AppDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDropdownMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
