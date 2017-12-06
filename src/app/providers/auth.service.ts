import { Injectable } from '@angular/core';

// AngularFire2 v4
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  users: FirebaseListObservable<any[]>;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.users = af.list('/users', {});
    this.user = this.afAuth.authState;
  }

  getUser() {
    return this.user;
  }

  signup(nombre, apellido, email, password, status) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user != undefined) {
          console.log(user);
          this.users.push({
            nombre: nombre,
            apellido: apellido,
            email: email,
            status: status
          });
        }
      })
      .catch(e => console.log(e.message));
  }

  login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('You logged in!\nYour user info is: ');
        console.log(this.user);
      })
      .catch(e => console.log("Error en el login:\n" + e.message));
  }

  logout() {
      this.afAuth.auth.signOut();
      console.log('You logged out!');
  }
}
