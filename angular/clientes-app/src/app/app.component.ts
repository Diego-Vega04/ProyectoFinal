import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'App Angular';
  curso: string = 'Curso spring con Angular';
  profesor: string = 'Andres Guzman';
}
