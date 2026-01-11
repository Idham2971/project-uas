import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './component/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header], // Cukup RouterOutlet saja
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project-uas');
}