import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// AngularFire2 v4
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

// Services
import { AuthService } from '../providers/auth.service';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  private user;
  private userObject: FirebaseListObservable<any>;

  private nombre: Observable<string>;
  private apellido;
  private status;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public authService: AuthService, private router: Router) {

    // this.nombre;
    //this.user = this.authService.getMyUser();
    afAuth.auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in
        this.user = user;
        console.log("User ID:", this.user.uid);

        const userObject = db.object('users/' + this.user.uid);

        userObject.subscribe(response => {
          this.nombre = response.nombre;
          this.apellido = response.apellido;
          this.status = response.status;
          console.log('Promise returned! User name: ', this.nombre);
        });

      } else {
        // No user is signed in.
      }
    });

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() { }

}
