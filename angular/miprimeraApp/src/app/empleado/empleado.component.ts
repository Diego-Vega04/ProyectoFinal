import { Component } from '@angular/core';

@Component({
  selector: 'app-empleado',
  standalone: false,
  templateUrl: './empleado.component.html',
  //template: "<p>Aquí va un empleado</p>",
  styleUrl: './empleado.component.css',
  //styles:["p{background-color:red;}"]
})
export class EmpleadoComponent {

  nombre="Juan";
  apellido="Díaz";
  private edad=18;
  empresa="Google";
  habilitacionCuadro=false;

  usuRegistrado=false;

  textoRegistro = "No hay nadie registrado";

  getEdad(){
    return this.edad;
  }

  getRegistroUsuario(){

    this.usuRegistrado = false; 
  }

  setUsuarioRegistrado(event:Event){
    //alert("El usuario se acaba de registrar");

    if((<HTMLInputElement>event.target).value=="si"){
      this.textoRegistro = "El usuario se acaba de registrar";
    }else this.textoRegistro="No hay nadie registrado";
  }
}
