import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
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
}
