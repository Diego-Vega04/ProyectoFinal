import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Marca {
  nombre: string;
  imagen: string;
}

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MarcasComponent implements OnInit {
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  marcas: Marca[] = [];

  ngOnInit(): void {
    this.marcas = [
      { nombre: 'HP', imagen: 'assets/marcas/hp.png' },
      { nombre: 'Apple', imagen: 'assets/marcas/apple.png' },
      { nombre: 'Samsung', imagen: 'assets/marcas/samsung.png' },
      { nombre: 'Sony', imagen: 'assets/marcas/sony.png' },
      { nombre: 'LG', imagen: 'assets/marcas/lg.png' },
      { nombre: 'Lenovo', imagen: 'assets/marcas/lenovo.png' },
      { nombre: 'Asus', imagen: 'assets/marcas/asus.png' },
      { nombre: 'MSI', imagen: 'assets/marcas/msi.png' }
    ];
  }

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -220, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 220, behavior: 'smooth' });
  }
}
