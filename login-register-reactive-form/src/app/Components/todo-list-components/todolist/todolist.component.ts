import { Component } from '@angular/core';
import { AddtodoComponent } from '../addtodo/addtodo.component';
import { ListItemsComponent } from '../list-items/list-items.component';
import { Todo } from '../../../models/Todo';
import { AuthService } from '../../../service/authentication-service/auth.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { DataService } from '../../../service/data.service';
import { UserData } from '../../../models/users';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [NavbarComponent, AddtodoComponent, ListItemsComponent],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent {
  todos: Todo[] = [];
  user: UserData = { userId: '', todos: [] };
  constructor(private auth: AuthService, private dataService: DataService) {}

  ngOnInit() {
    this.user.userId = this.dataService.getUserId();
    this.user.todos = this.dataService.getUserTodos(this.user.userId);
    console.log(this.dataService.getUserTodos(this.user.userId));
    console.log(this.user);
  }

  addTodo(newTodo_desc: string) {
    this.user.todos.push({
      sno: this.user.todos.length + 1,
      description: newTodo_desc,
      active: false,
    });
    this.dataService.updateTodo(this.user);
  }
  deleteIndex(index: number) {
    this.user.todos.splice(index, 1);
    const len = this.user.todos.length;
    for (let i = 0; i < len; i++) {
      this.user.todos[i].sno = i + 1;
    }
    this.dataService.updateTodo(this.user);
  }
  checkTodo(index: number) {
    this.user.todos[index].active = !this.user.todos[index].active;
    this.dataService.updateTodo(this.user);
  }
}
