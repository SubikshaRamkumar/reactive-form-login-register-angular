import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-addtodo',
  standalone: true,
  imports: [],
  templateUrl: './addtodo.component.html',
  styleUrl: './addtodo.component.css',
})
export class AddtodoComponent {
  @Output() todoAdded = new EventEmitter<string>();

  addTodo(todo_desc: string) {
    console.log(todo_desc);
    this.todoAdded.emit(todo_desc);
  }
}
