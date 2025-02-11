import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  picture: string | null = null;
  email: string | null = null;
Home: any;

constructor( private authGoogleService: AuthGoogleService,     private router: Router){

}
ngOnInit() {
  this.loadProfile(); // Initial load
  const intervalId = setInterval(() => {
    this.loadProfile(); // Load once after 100ms
    clearInterval(intervalId); // Stop the interval after the first execution
  }, 100);
}

showData(){
    const data = JSON.stringify(this.authGoogleService.getProfile())
    console.log(data);
    alert(data)

}
logOut(){
  this.authGoogleService.logout()
  this.router.navigate(['login']);
}

loadProfile() {
  const claims: any = this.authGoogleService.getProfile();
  if (claims) {
    this.picture = claims.picture || null;
    this.email = claims.email || null;
    console.log('User email:', this.email);

  } else {
    console.log('No user profile available.');
  }
}


}
