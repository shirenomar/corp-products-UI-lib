import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicSideBarComponent } from 'libs/ui-components/src/lib/dynamic-side-bar/dynamic-side-bar.component';

describe('SideBarComponent', () => {
  let component: DynamicSideBarComponent;
  let fixture: ComponentFixture<DynamicSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSideBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
