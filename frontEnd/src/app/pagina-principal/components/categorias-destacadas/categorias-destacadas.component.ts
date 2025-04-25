import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Categoria {
  nombre: string;
  imagen: string;
}

@Component({
  selector: 'app-categorias-destacadas',
  templateUrl: './categorias-destacadas.component.html',
  styleUrls: ['./categorias-destacadas.component.css'],
  imports: [CommonModule]
})
export class CategoriasDestacadasComponent implements OnInit {
  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.categorias = [
      { nombre: 'Los mejores portátiles', imagen: 'assets/categorias/portatiles.png' },
      { nombre: 'Componentes de PC', imagen: 'assets/categorias/componentes.png' },
      { nombre: 'Monitores en tendencia', imagen: 'assets/categorias/monitores.png' },
      { nombre: 'Novedades en televisores', imagen: 'assets/categorias/tv.png' },
      { nombre: 'Estrena smartphone', imagen: 'assets/categorias/smartphone.png' },
      { nombre: 'Conecta con tu hogar', imagen: 'assets/categorias/hogar.png' }
    ];
  }
}
