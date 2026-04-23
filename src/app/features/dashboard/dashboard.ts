import { Component } from '@angular/core';
import {Navbar} from '@shared/components/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  imports: [
    Navbar
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true,
})
export class Dashboard {}
