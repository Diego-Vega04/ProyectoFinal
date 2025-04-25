import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasadoNavegacionComponent } from './basado-navegacion.component';

describe('BasadoNavegacionComponent', () => {
  let component: BasadoNavegacionComponent;
  let fixture: ComponentFixture<BasadoNavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasadoNavegacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasadoNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
