import { Component } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authGoogleService: AuthGoogleService) { }

  login() {
    this.authGoogleService.login();
  }
}
// import { Component } from '@angular/core';
// import { AuthGoogleService } from '../../services/auth-google.service';
// import { NgxSpinnerService } from 'ngx-spinner';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   constructor(
//     private authGoogleService: AuthGoogleService,
//     private spinner: NgxSpinnerService
//   ) {}

// login() {
//   this.spinner.show();

//   try {
//     this.authGoogleService.login();
//   } finally {
//     setTimeout(() => {
//       this.spinner.hide();
//     }, 2000); // Adjust delay as needed
//   }
// }

// }
