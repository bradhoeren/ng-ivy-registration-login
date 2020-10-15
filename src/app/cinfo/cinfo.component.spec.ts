import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinfoComponent } from './cinfo.component';

describe('CinfoComponent', () => {
  let component: CinfoComponent;
  let fixture: ComponentFixture<CinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
