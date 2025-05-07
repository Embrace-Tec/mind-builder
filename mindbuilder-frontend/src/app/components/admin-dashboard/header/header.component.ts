import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<void>();
  userRole: string | null = null;

  ngOnInit() {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      this.userRole = JSON.parse(userDetails).role;
    }
  }

  toggle() {
    this.toggleEvent.emit();
  }
}
