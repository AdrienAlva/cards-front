import {Component, inject} from '@angular/core';
import {Navbar} from '@shared/components/navbar/navbar';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {Router} from '@angular/router';
import {ROUTES_ENUM} from '@shared/enums/routes.enum';

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
export class Dashboard {

  private readonly router = inject(Router);

  toNewGame(): void {
    this.router.navigate([ROUTES_ENUM.game()]);
  }

}
