import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-dialog',
  standalone: false,
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css'
})
export class ReviewDialogComponent {
  selectedRating: number = 0;
  hoveredRating: number = 0;
  pros: string = '';
  cons: string = '';
  opinion: string = '';
  rating: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  setRating(rating: number) {
    this.selectedRating = rating;
    this.rating = rating; 
  }

  onEnviar(): void {
    this.dialogRef.close({
      pros: this.pros,
      cons: this.cons,
      opinion: this.opinion,
      rating: this.selectedRating
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  hoverRating(rating: number): void {
    this.hoveredRating = rating;  
  }

  resetHover(): void {
    this.hoveredRating = 0; 
  }

}
