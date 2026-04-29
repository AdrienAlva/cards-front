import {Component, OnInit} from '@angular/core';
import {Navbar} from '@shared/components/navbar/navbar';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-user-profile',
  imports: [
    Navbar,
    Card
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
  standalone: true,
})
export class UserProfile implements OnInit {

  // TODO : get le User donne en parametre via le service ? Ou bien passable en parametre a l'init ?

  ngOnInit() {
  }

}
