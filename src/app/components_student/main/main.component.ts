import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { AdmineventsService } from '../../services/adminServices/adminevents.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, OnDestroy {
  EventsList: any[] = [];
  private destroy$ = new Subject<void>();
  newPost: string = '';
  userPosts: string[] = [];
  currentDate: Date = new Date();
  latestPosts: string[] = [];
  addPost() {
    if (this.newPost.trim()) {
      this.userPosts.unshift(this.newPost);
      this.latestPosts = [this.newPost, ...this.latestPosts].slice(0, 5); // Show the latest 5 posts
      this.newPost = ''; // Clear input
    }
  }
  
  constructor(
    private service: AdmineventsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const myButton = document.getElementById('myBtn');
    if (myButton) {
      myButton.style.display =
        window.scrollY > 20 ? 'block' : 'none';
    }
  }

  topFunction(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  

 
}
