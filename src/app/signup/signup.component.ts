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
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private nombre: string;
  private apellido: string;
  private email: string;
  private password: string;
  private status: string;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, public authService: AuthService, private router: Router) { }

  signup() {
    this.authService.signup(this.nombre, this.apellido, this.email, this.password, this.status);
    this.router.navigateByUrl('/members');
  }

  gotoLogin() {
    this.router.navigateByUrl('/login');
  }


  ngOnInit() {
  }

}
