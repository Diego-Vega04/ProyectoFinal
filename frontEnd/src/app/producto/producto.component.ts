import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { Producto } from '../models/producto';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-producto',
  standalone: false,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit{
  productId!: number;
  product!: Producto | undefined;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private productService: ProductoService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      this.productService.getById(this.productId).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => {
          console.error('Error al cargar el producto', err);
        }
      });
    });
  }

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
