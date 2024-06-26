import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // console.log('access');
    this.auth.canAccess();
    if (this.auth.isAuthenticated()) {
      // call user details service
      this.auth.detail().subscribe({
        next: (data) => {
          // console.log(data.users);
          // console.log(data.users[0]);
          this.user.localId = data.users[0].localId;
          this.user.displayName = data.users[0].displayName;
        },
      });
    }
  }

  user = { localId: '', displayName: '' };
}
