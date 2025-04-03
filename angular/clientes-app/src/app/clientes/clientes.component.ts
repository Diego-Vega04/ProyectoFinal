import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit{
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void{
    Swal.fire({
      title: "Está seguro?",
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre}  ${cliente.apellido}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, borrar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true

    }).then((result) => {
      if (result.value && cliente.id != undefined) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Cliente Eliminado',
              `Cliente ${cliente.nombre} eliminado con exito`,
              'success'
            )
          }
        )
      } 
    });
  }
  
}
