import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  standalone: false,
  templateUrl: './directiva.component.html',
  styleUrl: './directiva.component.css'
})
export class DirectivaComponent {

  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#'];
  habilitar: boolean = true;

  setHabilitar():void{
    this.habilitar = (this.habilitar)? false: true
  }
}
