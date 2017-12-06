import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// AngularFire2 v4
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
// import EmailValidator from 'email-validator';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  // user: Observable<firebase.User>;
  // users: FirebaseListObservable<any[]>;

  @Input() show: boolean;
  @Output() showSignup = new EventEmitter<boolean>();


  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private router: Router) {
    // this.users = af.list('/users', {});
    // this.user = this.afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.router.navigateByUrl('/members');
      })
      .catch(e => console.log("Error en el login:\n" + e.message));
  }

  logout() {
      this.afAuth.auth.signOut();
  }

  gotoSignup() {
    this.router.navigateByUrl('/signup');
  }

  ngOnInit() {
    this.logout();
  }

}
