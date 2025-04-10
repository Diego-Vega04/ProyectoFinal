import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule]
})
export class Filtro2Component implements OnInit {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  currentSort: string = 'relevance';

  constructor() { }

  ngOnInit(): void {
    // Initialize with sample product data
    this.products = [
      {
        id: 1,
        title: 'PcCom Ready Intel Core i5-12400F / 32 GB / 1 TB SSD / RTX 3060',
        currentPrice: 859,
        originalPrice: 1012.20,
        rating: 4.6,
        reviews: 122,
        discount: 15,
        image: 'https://thumb.pccomponentes.com/w-150-150/articles/1084/10846087/1348-pccom-ready-intel-core-i5-12400f-32-gb-1tb-ssd-rtx-4060-opiniones.jpg',
        trending: true,
        shipping: 'Envío gratis. Recíbelo mañana',
        dateAdded: new Date('2023-10-15'),
        salesCount: 245
      },
      {
        id: 2,
        title: 'PcCom Ready Intel Core i5-12400F / 16GB / 1TB SSD / RTX 3050',
        currentPrice: 649,
        originalPrice: 783.50,
        rating: 4.6,
        reviews: 136,
        discount: 17,
        image: 'https://thumb.pccomponentes.com/w-150-150/articles/1084/10846078/156-pccom-lite-intel-core-i5-12400f-16gb-1tb-ssd-rtx-3050-negro.jpg',
        trending: true,
        shipping: 'Envío gratis. Recíbelo mañana',
        moreOptions: true,
        dateAdded: new Date('2023-11-05'),
        salesCount: 189
      },
      {
        id: 3,
        title: 'PcCom Ready AMD Ryzen 7 5800X / 32GB / 1TB SSD / RTX 4060 Ti',
        currentPrice: 1199,
        originalPrice: 1425.90,
        rating: 4.7,
        reviews: 102,
        discount: 16,
        image: 'https://thumb.pccomponentes.com/w-150-150/articles/1078/10789838/1861-pccom-ready-amd-ryzen-7-5800x-32gb-1tb-ssd-rtx-4060-ti-review.jpg',
        shipping: 'Envío gratis. Recíbelo mañana',
        moreOptions: true,
        dateAdded: new Date('2023-09-20'),
        salesCount: 156
      },
      {
        id: 4,
        title: 'PcCom Ready AMD Ryzen 7 5800X / 32GB / 1TB SSD / RTX 4060 Ti / Windows 11 Home',
        currentPrice: 1349,
        originalPrice: 1730.73,
        rating: 4.7,
        reviews: 102,
        discount: 22,
        image: 'https://thumb.pccomponentes.com/w-150-150/articles/1079/10790432/1285-pccom-ready-amd-ryzen-7-5800x-32gb-1tb-ssd-rtx-4060-ti-windows-11-home-3c3fca00-dfda-490b-a1f4-f368053eae57.jpg',
        recommended: true,
        shipping: 'Envío gratis. Recíbelo mañana',
        moreOptions: true,
        dateAdded: new Date('2023-12-01'),
        salesCount: 210
      },
      {
        id: 5,
        title: 'PcCom Ready AMD Ryzen 7 5800X / 32GB / 2TB SSD / RTX 4060 Ti / Windows 11 Home',
        currentPrice: 1429,
        originalPrice: 1639.67,
        rating: 4.7,
        reviews: 102,
        discount: 13,
        image: 'https://thumb.pccomponentes.com/w-150-150/articles/1086/10867134/1853-pccom-ready-amd-ryzen-7-5800x-32gb-2tb-ssd-rtx-4060-ti-windows-11-home.jpg',
        shipping: 'Envío gratis. Recíbelo mañana',
        moreOptions: true,
        dateAdded: new Date('2024-01-10'),
        salesCount: 178
      }
    ];

    // Initialize displayed products with default sort (relevance)
    this.displayedProducts = [...this.products];
    console.log('Products loaded:', this.displayedProducts.length);
  }

  sortProducts(sortType: string): void {
    this.currentSort = sortType;
    
    // Create a copy of the products array to sort
    let sortedProducts = [...this.products];
    
    switch (sortType) {
      case 'relevance':
        // Default order (could be based on a relevance score in a real app)
        // For this example, we'll just reset to the original order
        sortedProducts = [...this.products];
        break;
        
      case 'price_asc':
        // Sort by price, lowest first
        sortedProducts.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
        
      case 'price_desc':
        // Sort by price, highest first
        sortedProducts.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
        
      case 'bestsellers':
        // Sort by number of sales
        sortedProducts.sort((a, b) => b.salesCount - a.salesCount);
        break;
        
      case 'offers':
        // Sort by discount percentage
        sortedProducts.sort((a, b) => b.discount - a.discount);
        break;
        
      case 'best_rated':
        // Sort by rating
        sortedProducts.sort((a, b) => {
          // First by rating
          if (b.rating !== a.rating) {
            return b.rating - a.rating;
          }
          // Then by number of reviews if ratings are equal
          return b.reviews - a.reviews;
        });
        break;
        
      case 'newest':
        // Sort by date added
        sortedProducts.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
        break;
    }
    
    // Update the displayed products
    this.displayedProducts = sortedProducts;
  }
}
