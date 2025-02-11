import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected from styleUrl to styleUrls
})
export class AppComponent implements OnInit {
  title = 'jpis_frontend';

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    // Show the spinner when the component initializes
    this.spinner.show();

    // Hide the spinner after a delay (for demonstration purposes)
    setTimeout(() => {
      this.spinner.hide();
    }, 2000); // Adjust delay as needed
  }
}