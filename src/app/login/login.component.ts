import { Component, OnInit } from '@angular/core';

// AngularFire2 v4
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
// import EmailValidator from 'email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private router: Router) {
    // this.items = af.list('/messages', {
    //   query: {
    //     limitToLast: 50
    //   }
    // });

    this.user = this.afAuth.authState;
  }

  resolveUser() {
    this.afAuth.authState.subscribe(auth => {
        if (auth) {
          console.log(auth.uid);
        } else {
           // logged out
        }
    });
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.router.navigateByUrl('/members');
      })
      .catch(e => console.log("Error en el login:\n" + e.message));
  }

  signup() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.router.navigateByUrl('/members');
      })
      .catch(e => console.log(e.message));
  }

  logout() {
      this.afAuth.auth.signOut();
  }

  // Send(desc: string) {
  //     this.items.push({ message: desc});
  //     this.msgVal = '';
  // }

  ngOnInit() {
  }

}
