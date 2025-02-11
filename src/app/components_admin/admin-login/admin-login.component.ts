// import { Component } from '@angular/core';
// import { LoginService } from '../../services/auth.service';
// import { Router } from '@angular/router'; // <-- This import is necessary

// @Component({
//   selector: 'app-admin-login',
//   templateUrl: './admin-login.component.html',
//   styleUrl: './admin-login.component.css'
// })
// export class AdminLoginComponent {
//   username: string = '';
//   password: string = '';
//   loginMessage: string = '';

//   constructor(private authService: LoginService,  private router: Router) {}

//   onLogin(): void {
//   console.log("Logging in with:", this.username, this.password);
//   this.authService.login(this.username, this.password).subscribe(
//     (response) => {
//       console.log("Login successful:", response);
//       this.loginMessage = 'Login successful!';
//       this.router.navigate(['/admin', { outlets: { secondary: ['dashboard'] } }]);
//     },
//     (error) => {
//       console.error("Login error:", error);
//       this.loginMessage = 'Invalid username or password.';
//     }
//   );
// }

// }
import { Component } from '@angular/core';
import { AldminloginService } from '../../services/adminlogin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  loginMessage: string = '';

  constructor(private authService: AldminloginService, private router: Router) {}

  onLogin(): void {
    console.log("Logging in with:", this.username, this.password);
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log("Login successful:", response);
        this.loginMessage = 'Login successful!';
        
        // Assuming the response contains the user's role (e.g., { role: 'admin' } or { role: 'user' })
        const role = response.role;

        if (role === 'Admin') {
          // Admin navigation
          this.router.navigate(['/admin', { outlets: { secondary: ['dashboard'] } }]);
        } else if (role === 'User') {
          // Regular user navigation
          this.router.navigate(['/main']);
        } else {
          // Handle unexpected role or no role (error case)
          this.loginMessage = 'Role not assigned or invalid role.';
        }
      },
      (error) => {
        console.error("Login error:", error);
        this.loginMessage = 'Invalid username or password.';
      }
    );
  }
}

