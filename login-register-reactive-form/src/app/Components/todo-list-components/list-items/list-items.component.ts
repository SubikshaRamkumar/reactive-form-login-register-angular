import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodolistComponent } from '../todolist/todolist.component';
import { CommonModule } from '@angular/common';
import { UserData } from '../../../models/users';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [TodolistComponent, CommonModule],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css',
})
export class ListItemsComponent implements OnInit {
  @Input() user!: UserData;
  @Output() todoIndex = new EventEmitter<number>();
  @Output() todoCheck = new EventEmitter<number>();
  ngOnInit(): void {
    console.log(this.user);
  }

  deleteTodo(index: number) {
    this.todoIndex.emit(index);
  }
  checkTodo(index: number) {
    this.todoCheck.emit(index);
  }
}
