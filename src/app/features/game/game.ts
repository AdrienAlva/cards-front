import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {Navbar} from '@shared/components/navbar/navbar';

@Component({
  selector: 'app-game',
  imports: [
    Button,
    Card,
    Navbar
  ],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {}
