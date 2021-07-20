import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZerionSampleFormComponent } from './zerion-sample-form.component';

describe('ZerionSampleFormComponent', () => {
  let component: ZerionSampleFormComponent;
  let fixture: ComponentFixture<ZerionSampleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZerionSampleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZerionSampleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
