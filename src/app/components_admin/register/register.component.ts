// // src/app/register/register.component.ts
// import { Component } from '@angular/core';
// import { UserService } from '../../services/user.service';


// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   user = {
//     username: '',
//     password: '',
//     email: ''
//   };
//   message: string | null = null;

//   constructor(private userService: UserService) {}

//   onSubmit(): void {
//     this.userService.register(this.user).subscribe(
//       response => {
//         this.message = 'User registered successfully!';
//         this.clearForm();
//       },
//       error => {
//         this.message = 'Registration failed. Please try again.';
//       }
//     );
//   }

//   clearForm(): void {
//     this.user.username = '';
//     this.user.password = '';
//     this.user.email = '';
//   }
// }
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    email: '',
    roleId: 2 // Default to 'User' role (RoleId = 2)
  };

  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' }
  ]; // Static role options. Alternatively, fetch from API.

  message: string | null = null;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }
  onSubmit(): void {
    this.userService.register(this.user).subscribe(
      response => {
        this.message = 'User registered successfully!';
        this.clearForm();
      },
      error => {
        this.message = 'Registration failed. Please try again.';
      }
    );
  }

  clearForm(): void {
    this.user = { username: '', password: '', email: '', roleId: 2 };
  }
}

