import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  currentUser: any = null;
  
  stats = signal([
    { label: 'Revenue', value: '$24,500', color: 'blue' },
    { label: 'Orders', value: '450', color: 'green' },
    { label: 'Visitors', value: '12,000', color: 'orange' }
  ]);

  activities = signal([
    { id: 1, task: 'Server Update', time: '2 mins ago', status: 'Done' },
    { id: 2, task: 'New User Registered', time: '1 hour ago', status: 'Process' },
    { id: 3, task: 'Database Backup', time: '5 hours ago', status: 'Done' }
  ]);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result;
        this.authService.updateProfilePhoto(base64String);
        this.loadUser(); // Refresh UI
      };
      reader.readAsDataURL(file);
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}