import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Icono {
  nombre: string;
  imagen: string;
}

@Component({
  selector: 'app-iconos',
  templateUrl: './iconos.component.html',
  styleUrls: ['./iconos.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class IconosComponent implements OnInit {
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  iconos: Icono[] = [];

  ngOnInit(): void {
    this.iconos = [
      { nombre: 'Ofertas especiales', imagen: 'assets/iconos/icon-ofertas.png' },
      { nombre: 'Envío gratuito en pedidos superiores a 50€', imagen: 'assets/iconos/icon-envio.png' },
      { nombre: 'Recibe tu pedido en 24h', imagen: 'assets/iconos/icon-pedido.png' },
      { nombre: 'Devoluciones gratuitas', imagen: 'assets/iconos/icon-devo.png' },
      { nombre: 'Garantía de solución en 24h', imagen: 'assets/iconos/icon-solucion.png' },
      { nombre: 'Lanzamientos y novedades', imagen: 'assets/iconos/icon-novedades.png' },
      { nombre: 'Ordenadores PcCom', imagen: 'assets/iconos/icon-ordenadores.png' },
      { nombre: 'Promociones', imagen: 'assets/iconos/icon-promociones.png' },
      { nombre: 'Servicios', imagen: 'assets/iconos/icon-servicios.png' }
    ];
  }

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -220, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 220, behavior: 'smooth' });
  }
}
