import {Component, inject, OnInit, signal} from '@angular/core';
import {Navbar} from '@shared/components/navbar/navbar';
import {Card} from 'primeng/card';
import {User} from '@shared/models/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '@core/services/user-service';
import {ROUTES_ENUM} from '@shared/enums/routes.enum';

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
  route: ActivatedRoute = inject(ActivatedRoute);
  userService: UserService = inject(UserService);

  readonly profileUser = signal<User | null>(null);

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {

      if (id == this.userService.connectedUser?.id) {
        this.profileUser.set(this.userService.connectedUser);
      } else {
        this.userService.getUser(id).subscribe({
            next: (user) => {
              this.profileUser.set(user);
            }
          }
        );
      }

    }

  }

}
