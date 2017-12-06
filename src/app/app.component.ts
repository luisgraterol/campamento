import { Component, OnInit } from '@angular/core';

// AngularFire2 v4
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
// import EmailValidator from 'email-validator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  // private showLogin: boolean;
  // private showSignup: boolean;

  constructor() {
    // this.showLogin = true;
    // this.showSignup = false;
  }

  // mostrarSignup(showSignup) {
  //   this.showSignup = showSignup;
  // }

  ngOnInit() {}
}
