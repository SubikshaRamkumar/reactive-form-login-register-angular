import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userId: string;
  dataService: DataService = inject(DataService);
  constructor() {
    this.userId = '';
    console.log('Home instance created');
  }

  ngOnInit(): void {
    console.log('HomeComponent ngOnInit called');
    // this.dataService.userIdEmitter.subscribe((val) => {
    this.dataService.userId$.subscribe((val) => {
      console.log('Subscription callback called with:', val);
      if (val) {
        console.log('Received userId in HomeComponent:', val);
        this.userId = val;
      } else {
        this.userId = 'Helo User';
      }
    });
    // setTimeout(() => {
    //   this.dataService.raiseUserIdEmitter('testUserId');
    // }, 1000);
    // const currentUserId = this.dataService.getUserId();
    // console.log('Immediate getUserId called:', currentUserId);
    // console.log(currentUserId + ' cureent');
    // if (currentUserId) {
    //   console.log('Current userId retrieved:', currentUserId);
    //   this.userId = currentUserId;
    // }
  }
}
