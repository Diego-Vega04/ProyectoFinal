import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-dialog',
  template: `
    <h2 mat-dialog-title>Añadir opinión</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Pros</mat-label>
        <textarea matInput [(ngModel)]="data.pros"></textarea>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Contras</mat-label>
        <textarea matInput [(ngModel)]="data.cons"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button class="cancel-button" (click)="onNoClick()">Cancelar</button>
      <button mat-button class="submit-button" (click)="onSubmit()" cdkFocusInitial>Enviar</button>
    </mat-dialog-actions>
  `,
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatInput,
    MatDialogTitle,
    MatIconModule
  ],
  styles: [`
    .full-width {
      width: 100%;
    }

    textarea {
      min-height: 50px;
    }

    .submit-button {
      background-color: #7a4a9c;
      color: white !important;
      transition: all 0.3s ease;
      border-radius: 4px;
    }

    .cancel-button {
      color: #7a4a9c;
      border: 1px solid #7a4a9c;
      transition: all 0.3s ease;
      border-radius: 4px;
    }

    .submit-button:hover {
      background-color: #5d3a7c;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .cancel-button:hover {
      background-color: #f0e6f7;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }

    .submit-button:active, .cancel-button:active {
      animation: pulse 0.3s ease;
    }

    .stars mat-icon {
      cursor: pointer;
      transition: all 0.2s;
    }

    .stars mat-icon:hover {
      transform: scale(1.2);
    }
  `]
})
export class ReviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pros: string, cons: string, rating?: number }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    Swal.fire({
      title: "¡Gracias!",
      text: "¡Tu opinión seguro que nos será de ayuda!",
      icon: "success"
    });
    this.dialogRef.close(this.data);
  }
}
