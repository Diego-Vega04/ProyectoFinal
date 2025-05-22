import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-producto-form-dialog',
  standalone: false,
  templateUrl: './producto-form-dialog.component.html',
  styleUrl: './producto-form-dialog.component.css'
})
export class ProductoFormDialogComponent {

  productoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productoForm = this.fb.group({
      categoria: ['', [Validators.required, Validators.min(0)]],
      nombre: ['', Validators.required],
      marca: ['', [Validators.required, Validators.min(0)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      descripcion: [''],
    });
  }

  guardar() {
    if (this.productoForm.valid) {
      this.dialogRef.close(this.productoForm.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
