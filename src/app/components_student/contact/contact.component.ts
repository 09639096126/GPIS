// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import emailjs from 'emailjs-com';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-contact',
//   templateUrl: './contact.component.html',
//   styleUrls: ['./contact.component.css']
// })
// export class ContactComponent {
//   incidentForm: FormGroup;
//   selectedFile: File | null = null;
//   uploadedFileUrl: string | null = null;

//   constructor(private fb: FormBuilder, private http: HttpClient) {
//     this.incidentForm = this.fb.group({
//       fullName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       incidentDate: ['', Validators.required],
//       details: ['', Validators.required],
//     });
//   }

//   onFileSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.selectedFile = input.files[0];
//     }
//   }

//   uploadFile() {
//     if (this.selectedFile) {
//       const formData = new FormData();
//       formData.append('file', this.selectedFile, this.selectedFile.name);

//       // Replace with your file upload URL
//       return this.http.post('https://drive.google.com/drive/folders/1JAVtpGnFmEnX7ZuZVbmVVvZQD4oMy3RP?usp=sharing', formData)
//         .toPromise()
//         .then((response: any) => {
//           // Assuming the response contains the URL of the uploaded file
//           this.uploadedFileUrl = response.fileUrl; // Adjust based on your API response
//         })
//         .catch(error => {
//           console.error('File upload failed:', error);
//           alert('Failed to upload the file.');
//         });
//     }
//     return Promise.resolve(); // No file to upload
//   }

//   async submitForm() {
//     if (this.incidentForm.valid) {
//       await this.uploadFile(); // Upload the file first

//       const templateParams = {
//         fullName: this.incidentForm.value.fullName,
//         email: this.incidentForm.value.email,
//         incidentDate: this.incidentForm.value.incidentDate,
//         details: this.incidentForm.value.details,
//         mediaLink: this.uploadedFileUrl // Include the uploaded file URL
//       };

//       emailjs.send('service_mk9mmws', 'template_pvvaxvf', templateParams, 'G5hXul6GvkQYGjV3i')
//         .then(() => {
//           alert('Incident report submitted successfully.');
//           this.incidentForm.reset(); // Reset the form after successful submission
//           this.selectedFile = null; // Reset the file input
//           this.uploadedFileUrl = null; // Clear the uploaded file URL
//         }, (error) => {
//           alert('Failed to submit the incident report: ' + JSON.stringify(error));
//         });
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
import { AuthGoogleService } from '../../services/auth-google.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  ngOnInit(): void {
    this.loadProfile()
  }
  incidentForm: FormGroup;
  email: string | null = null;
  constructor(
    private fb: FormBuilder,
    private authGoogleService: AuthGoogleService

  ) {
    this.incidentForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      incidentDate: ['', Validators.required],
      details: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.incidentForm.valid) {
      const templateParams = {
        fullName: this.incidentForm.value.fullName,
        email: this.incidentForm.value.email,
        incidentDate: this.incidentForm.value.incidentDate,
        details: this.incidentForm.value.details
      };

      // Replace with your EmailJS service ID, template ID, and user ID
emailjs.send('service_mk9mmws', 'template_pvvaxvf', templateParams, 'G5hXul6GvkQYGjV3i')
.then(() => {
          alert('Incident report submitted successfully.');
          this.incidentForm.reset(); // Reset the form after successful submission
        }, (error) => {
          alert('Failed to submit the incident report: ' + JSON.stringify(error));
        });
    }
  }

  loadProfile() {
    const claims: any = this.authGoogleService.getProfile();
    if (claims) {
      this.email = claims.email || null;
      console.log('User email:', this.email);
  
      // Automatically populate the email field in the form
      this.incidentForm.patchValue({
        email: this.email
        
      }
    );
    } else {
      console.log('No user profile available.');
    }
  }
  
}