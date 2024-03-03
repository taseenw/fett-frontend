import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileJson: any = null;
  email: string = null;
  authProfile: any;

  constructor(public auth: AuthService, public usersService: UsersService) {}

  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => ((this.authProfile = profile), this.fetchUserByEmail(profile.email))
    );

  }
 
  fetchUserByEmail(email: string): void {
    this.usersService.getUserByEmail(email).subscribe(data => {
      console.log('Fetched user by email:', data);
      this.profileJson = data;
    }, error => {
      console.error('There was an error!', error);
    });
  }
}
