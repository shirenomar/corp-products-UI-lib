import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HijriCalendarComponent } from "./hijri-calendar.component";

describe("ReadMoreComponent", () => {
  let component: HijriCalendarComponent;
  let fixture: ComponentFixture<HijriCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HijriCalendarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HijriCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
