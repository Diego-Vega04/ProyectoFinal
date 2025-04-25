import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasTopComponent } from './ofertas-top.component';

describe('OfertasTopComponent', () => {
  let component: OfertasTopComponent;
  let fixture: ComponentFixture<OfertasTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfertasTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertasTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
