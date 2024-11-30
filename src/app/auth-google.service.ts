// import { Injectable } from '@angular/core';
// import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGoogleService {
//   router: any;

//   constructor(private oauthService: OAuthService) {
//     this.initLogin();
//   }

//   initLogin() {
//     const config: AuthConfig = {
//       issuer: 'https://accounts.google.com',
//       strictDiscoveryDocumentValidation: false,
//       clientId: '693611222238-rmrnu8v3j3cc5uj4k22sdsqgk6tkenr8.apps.googleusercontent.com',
//       redirectUri: window.location.origin + '/main',
//       scope: 'openid profile email'
//     };
    
//     this.oauthService.configure(config);
//     this.oauthService.setupAutomaticSilentRefresh();
    
//     this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
//       // Check if the user is authenticated
//       if (!this.oauthService.hasValidAccessToken()) {
//         this.login();  
//         this.router.navigate(['/login']); // Trigger the login flow if not authenticated
//       }
//     }).catch((err) => {
//       console.error('Error during OAuth initialization:', err);
//     });
//   }

//   login() {
//     this.oauthService.initLoginFlow();
//   }

//   logout() {
//     this.oauthService.logOut();
//   }

//   getProfile() {
//     return this.oauthService.getIdentityClaims();
//   }
// }

import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { authorizedUsers } from './data';  // Import the authorized emails list

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oauthService: OAuthService, private router: Router) {
    this.initLogin();
  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '693611222238-rmrnu8v3j3cc5uj4k22sdsqgk6tkenr8.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/main',
      scope: 'openid profile email'
    };

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      // After login attempt, check if the user is authenticated and authorized
      if (!this.oauthService.hasValidAccessToken()) {
        this.login();  // Trigger login if not authenticated
      } else {
        const userProfile = this.oauthService.getIdentityClaims();
        if (userProfile && this.isUserAuthorized(userProfile['email'])) {
          console.log('User is authorized');
        } else {
          // Show alert and redirect to login if the user is not authorized
          alert('You are not authorized to access this application');
          this.logout()
          this.router.navigate(['login']);  // Redirect to login page
        }
      }
    }).catch((err) => {
      console.error('Error during OAuth initialization:', err);
    });
  }

  // Check if the user's email is in the authorized list
  private isUserAuthorized(email: string): boolean {
    return authorizedUsers.includes(email);  // Use the imported list from data.ts
  }

  // Override getProfile method to ensure only authorized users can access their claims
  getProfile() {
    const userProfile = this.oauthService.getIdentityClaims();
    if (userProfile && this.isUserAuthorized(userProfile['email'])) {
      return userProfile;  // Return profile for authorized users
    } else {
      // Return null or any custom message if the user is not authorized
      return null;  // Unauthorized users cannot access profile
    }
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }
}

