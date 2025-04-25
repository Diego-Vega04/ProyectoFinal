import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPerderseComponent } from './no-perderse.component';

describe('NoPerderseComponent', () => {
  let component: NoPerderseComponent;
  let fixture: ComponentFixture<NoPerderseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoPerderseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoPerderseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
