import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AdmineventsService } from '../../services/adminServices/adminevents.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit, OnDestroy {
  EventsList: any[] = [];
  OriginalEventsList: any[] = []; // Store original data for search reset
  searchTerm: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private service: AdmineventsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.refreshEventsList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const myButton = document.getElementById('myBtn');
    if (myButton) {
      myButton.style.display = window.scrollY > 20 ? 'block' : 'none';
    }
  }

  topFunction(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  refreshEventsList(): void {
    this.service
      .getEventsList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          // Format EventTime here
          this.EventsList = data
            .map(event => ({
              ...event,
              EventTime: this.formatEventTime(event.EventTime) // Format time
            }))
            .sort((a, b) => b.Id - a.Id);

          this.OriginalEventsList = [...this.EventsList]; // Backup for search reset
        },
        (error) => {
          this.toastr.error('Failed to load events', 'Error');
        }
      );
  }

  // Format time as 10:00AM
  private formatEventTime(time: string): string {
    const date = new Date(`1970-01-01T${time}`); // Converts "10:00" to Date
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-US', options).replace(' ', ''); // Removes space before AM/PM
  }

  searchEvents(): void {
    if (this.searchTerm.trim() !== '') {
      this.EventsList = this.OriginalEventsList.filter(event =>
        event.EventName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.EventsList = [...this.OriginalEventsList]; // Reset to original list
    }
  }
}
