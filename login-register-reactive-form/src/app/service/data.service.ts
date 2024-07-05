// import { EventEmitter, Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData } from '../models/users';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root',
})
// export class DataService {
//   constructor() {
//     console.log('DataService instance created');
//   }
//   // userIdEmitter = new Subject<string>();
//   userIdEmitter: EventEmitter<string> = new EventEmitter<string>();
//   raiseUserIdEmitter(userId: string) {
//     console.log('Emitting userId:', userId);
//     // this.userIdEmitter.next(userId);
//     this.userIdEmitter.emit(userId);
//   }
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class DataService {
//   userIdEmitter: EventEmitter<string> = new EventEmitter<string>();
//   onrainseevent(val: string) {
//     this.userIdEmitter.emit(val);
//   }
// }
export class DataService {
  private userIdSubject = new BehaviorSubject<string>('');
  userDatas: UserData[] = JSON.parse(localStorage.getItem('userDatas') || '[]');
  userId$ = this.userIdSubject.asObservable();
  constructor() {
    console.log('DataService instance created');
  }

  setUserId(userId: string) {
    console.log('Setting userId:', userId);
    this.userIdSubject.next(userId);
  }
  getUserId(): string {
    return this.userIdSubject.value;
  }
  saveToStorage() {
    localStorage.setItem('userDatas', JSON.stringify(this.userDatas));
  }
  addToUsers(user: UserData): void {
    this.userDatas.push(user);
    this.saveToStorage();
  }
  getUserTodos(userId: string): Todo[] {
    this.userDatas = JSON.parse(localStorage.getItem('userDatas') || '[]');
    const foundUser = this.userDatas.find((singleUser) => {
      return singleUser.userId === userId;
    });
    return foundUser ? foundUser.todos : [];
  }
  updateTodo(user: UserData) {
    //both new todo push and check box
    this.userDatas.map((singelUser) => {
      if (singelUser.userId === user.userId) {
        singelUser.todos = user.todos;
      }
    });
    this.saveToStorage();
  }
}
