import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// AngularFire2 v4
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

// Services
import { AuthService } from '../providers/auth.service';

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

  @Input() show: boolean;
  @Output() showSignup = new EventEmitter<boolean>();


  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, public authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password);
    this.router.navigateByUrl('/members');
  }

  gotoSignup() {
    this.router.navigateByUrl('/signup');
  }

  ngOnInit() {
    this.authService.logout();
  }

}
