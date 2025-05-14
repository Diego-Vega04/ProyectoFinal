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
  reviewForm: FormGroup;
  selectedRating: number = 0;
  hoveredRating: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      pros: ['', Validators.required],
      contras: ['', Validators.required],
      opinion: ['', Validators.required]
    });
  }

  setRating(rating: number) {
    this.selectedRating = rating;
  }

  submit() {
    if (this.reviewForm.valid && this.selectedRating > 0) {
      const { pros, contras, opinion } = this.reviewForm.value;
      this.dialogRef.close({
        nota: this.selectedRating,
        pros,
        contras,
        opinion
      });
    }
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
