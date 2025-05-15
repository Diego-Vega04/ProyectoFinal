import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-lista-users',
  standalone: false,
  templateUrl: './lista-users.component.html',
  styleUrl: './lista-users.component.css'
})
export class ListaUsersComponent {

  users: User[] = [];

  constructor(
    private userService: UserService
  ){}

  ngOnInit(): void {
    
    this.userService.getAllUsers().subscribe(data => {
      this.users = data; 
    });
  }
}
