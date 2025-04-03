import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit{
  cliente: Cliente = new Cliente();
  titulo: String = "Crear cliente";
  errores: String[] = [];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    this.cargarCliente()
    
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe({
      next: (cliente) => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo cliente', `Cliente ${this.cliente.nombre} creado con éxito`, 'success');
      },
      error: (err) => {
        this.errores = err.error.errors as String[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    });
  }

  public update(): void{
    this.clienteService.update(this.cliente).subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actualizado', `Cliente ${this.cliente.nombre} actualizado con éxito`, 'success')
    })
  }
}
