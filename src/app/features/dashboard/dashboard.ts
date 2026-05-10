import { Component } from '@angular/core';
import {Navbar} from '@shared/components/navbar/navbar';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-dashboard',
  imports: [
    Navbar,
    Button,
    Card
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true,
})
export class Dashboard {}
