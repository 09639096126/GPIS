
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // ✅ Import HttpClient
import { lastValueFrom } from 'rxjs'; // ✅ Convert Observable to Promise
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  public isLoading = false; // ✅ Show loading state
  readonly APIUrl = 'http://172.22.106.193:5000/api/User/check-email';

  constructor(
    private toastr: ToastrService,
    private oauthService: OAuthService, 
    private router: Router,
    private spinner: NgxSpinnerService ,
    private http: HttpClient // ✅ Inject HttpClient
  ) {
    this.initLogin();
  }

  async initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '693611222238-rmrnu8v3j3cc5uj4k22sdsqgk6tkenr8.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/admin/(secondary:dashboard)',
      scope: 'openid profile email'
    };

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        this.checkEmail();
      });
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
    this.router.navigate(['/login']);
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();
  }

  // private async checkEmail() {
  //   this.isLoading = true; // ✅ Show loading state

  //   const claims = this.oauthService.getIdentityClaims();
  //   if (!claims || !claims['email']) {
  //     console.error('⚠ No email found in identity claims. Logging out.');
  //     this.logout();
  //     return;
  //   }

  //   const userEmail = claims['email'];
  //   console.log('🔍 Checking email:', userEmail);

  //   try {
  //     const response: any = await lastValueFrom(this.http.post(this.APIUrl, { email: userEmail }));
  //     if (response.exists) {
  //       console.log('✅ Authorized email:', userEmail);
        
  //     } else {
  //       console.warn('❌ Unauthorized email:', userEmail);
  //       this.logout();
  //     }
  //   } catch (error) {
  //     console.error('❌ Error checking email:', error);
  //     this.logout();
  //   } finally {
  //     this.isLoading = false; // ✅ Hide loading state
  //   }
  // }
  private async checkEmail() {
    this.spinner.show(); // Show the spinner
  
    const claims = this.oauthService.getIdentityClaims();
    if (!claims || !claims['email']) {
      console.error('⚠ No email found in identity claims. Logging out.');
      this.logout();
      this.spinner.hide(); // Hide the spinner
      return;
    }
  
    const userEmail = claims['email'];
    console.log('🔍 Checking email:', userEmail);
  
    try {
      const response: any = await lastValueFrom(this.http.post(this.APIUrl, { email: userEmail }));
  
      if (response.exists) {
        console.log('✅ Authorized email:', userEmail);
        
        // 🎯 Redirect Based on Role
        if (response.roleId === 1) { 
          await this.router.navigate(['/admin', { outlets: { secondary: ['dashboard'] } }], { replaceUrl: true });
        } else if (response.roleId === 2) { 
          await this.router.navigate(['/main'], { replaceUrl: true });
        } else { 
          console.warn('⚠ Unknown role. Logging out.');
          this.logout();
        }
      } else {
        console.warn('❌ Unauthorized email:', userEmail);
        this.logout();
      }
    } catch (error) {
      console.error('❌ Error checking email:', error);
      this.logout();
    } finally {
      this.spinner.hide(); // Hide the spinner
    }
  }
}
