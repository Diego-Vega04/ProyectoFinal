import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service';
import { Producto } from './producto';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit{
  producto: Producto = new Producto();
  titulo: String = "Crear producto";
  errores: String[] = [];
  product = { categoria: '' };
  categoriasValidas = ['Herramientas', 'Ferretería', 'Pinturas', 'Construcción', 'Bricolaje', 'Jardinería', 'Protección'];
  ubiValidas = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3'];

  constructor(private productoService: ProductoService, private router: Router, private activatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    this.cargarProducto()
    
  }

  cargarProducto(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.productoService.getProducto(id).subscribe( (producto) => this.producto = producto)
      }
    })
  }

  public create(): void{
    this.productoService.create(this.producto).subscribe({
      next: (producto) => {
        this.router.navigate(['/productos']);
        Swal.fire('Nuevo producto', `Producto ${this.producto.nombre} creado con éxito`, 'success');
      },
      error: (err) => {
        this.errores = err.error.errors as String[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    });
  }

  public update(): void{
    this.productoService.update(this.producto).subscribe(producto => {
      this.router.navigate(['/productos'])
      Swal.fire('Producto Actualizado', `Producto ${this.producto.nombre} actualizado con éxito`, 'success')
    })
  }
}
