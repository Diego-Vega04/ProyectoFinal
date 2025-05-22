import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFormDialogComponent } from './producto-form-dialog.component';

describe('ProductoFormDialogComponent', () => {
  let component: ProductoFormDialogComponent;
  let fixture: ComponentFixture<ProductoFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
