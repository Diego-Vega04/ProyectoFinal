import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

interface Product {
  id: number;
  title: string;
  currentPrice: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  discount: number;
  image: string;
  trending?: boolean;
  recommended?: boolean;
  shipping: string;
  moreOptions?: boolean;
  dateAdded: Date;
  salesCount: number;
}

@Component({
  selector: 'app-filtro2',
  templateUrl: './filtro2.component.html',
  styleUrls: ['./filtro2.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Filtro2Component implements OnInit {
  products: Producto[] = [];
  displayedProducts: Producto[] = [];
  currentSort: string = 'relevance';
  minPrice: number = 211;
  maxPrice: number = 9625;
  filteredProducts: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getAllProductos().subscribe({
      next: (productos) => {
        this.products = productos;
        this.filteredProducts = [...productos];
        this.displayedProducts = [...productos];
        console.log('Productos cargados:', productos); 
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  
  }

  updatePriceFilter(): void {
    // Make sure min is not greater than max
    if (this.minPrice > this.maxPrice) {
      this.minPrice = this.maxPrice;
    }
    
    // Filter products by price range
    this.filteredProducts = this.products.filter(product => 
      product.precio! >= this.minPrice && 
      product.precio! <= this.maxPrice
    );
    
    // Apply current sort to filtered products
    this.sortProducts(this.currentSort);
  }
  
  sortProducts(sortType: string): void {
    this.currentSort = sortType;
    
    // Create a copy of the filtered products array to sort
    let sortedProducts = [...this.filteredProducts];
    
    switch (sortType) {
      case 'relevance':
        // Default order (could be based on a relevance score in a real app)
        // For this example, we'll just reset to the original order
        sortedProducts = [...this.products];
        break;
        
      case 'price_asc':
        // Sort by price, lowest first
        sortedProducts.sort((a, b) => a.precio! - b.precio!);
        break;
        
      case 'price_desc':
        // Sort by price, highest first
        sortedProducts.sort((a, b) => b.precio! - a.precio!);
        break;
        
    }
    
    // Update the displayed products
    this.displayedProducts = sortedProducts;
  }
}
