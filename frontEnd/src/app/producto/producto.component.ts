import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';

@Component({
  selector: 'app-producto',
  standalone: false,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  constructor(public dialog: MatDialog) {}

  openReviewDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '500px',
      data: { pros: '', cons: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Pros:', result.pros);
        console.log('Cons:', result.cons);
      }
    });
  }
}
