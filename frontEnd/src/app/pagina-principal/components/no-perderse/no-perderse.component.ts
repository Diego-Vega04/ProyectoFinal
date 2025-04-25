import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-perderse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-perderse.component.html',
  styleUrls: ['./no-perderse.component.css'],
})
export class NoPerderseComponent {
  tarjetas = [
    {
      titulo: 'Tecnología para el día a día',
      descripcion: 'Descubre lo mejor en innovación y utilidad.',
      imagen: 'assets/no-perderse/card1.jpg',
    },
    {
      titulo: 'Gaming sin límites',
      descripcion: 'Lo último en rendimiento y diseño.',
      imagen: 'assets/no-perderse/card2.jpg',
    },
    {
      titulo: 'Ofertas que vuelan',
      descripcion: 'Precios únicos por tiempo limitado.',
      imagen: 'assets/no-perderse/card3.jpg',
    },
  ];
}
