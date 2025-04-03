import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'user-component',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() occupation: string = "";
  @Output() greet : EventEmitter<string> = new EventEmitter<string>();

  username: string = "Pedro";
  doesUserExists: boolean = true;
  operatingSystems = [{id: 'win', name: 'Windows'}, {id: 'osx', name: 'MacOS'}, {id: 'linux', name: 'Linux'}];
  isEditable: boolean = true;

  onMouseOver(osName: string): void{
    console.log(osName);
  }

  emitToParent(): void{
    this.greet.emit('Hola! Soy tu hijo');
  }
}
