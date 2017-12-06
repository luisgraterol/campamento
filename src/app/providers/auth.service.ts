import { Injectable } from '@angular/core';

// AngularFire2 v4
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  usersRef: FirebaseListObservable<any[]>;

  private myUser;
  private nombre: string;
  private apellido: string;
  private email: string;
  private status: string;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.usersRef = db.list('/users');
    this.user = this.afAuth.authState;
  }

  getMyUser() {
    return this.myUser;
  }

  signup(nombre, apellido, email, password, status) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((currentUser) => {

        // Si existe, entonces si se creo el usuario y se le hizo login:
        if (currentUser != undefined) {

          this.user = currentUser;

          this.myUser = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            status: status
          };

          // this.db.list('/users/' + currentUser.uid).push(this.myUser);

          const userRef = this.db.object('users/' + currentUser.uid);

          // userRef.set(this.myUser);

          userRef.update(this.myUser);

          // this.users.push(this.myUser);
          // console.log('You logged in!\nYour user info is: ');
          // console.log(this.myUser);
        }
      })
      .catch(e => console.log("Error en el signup:\n" + e.message));
  }

  login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((currentUser) => {

        // this.userid = currentUser.uid;
        // this.myUser.id = currentUser.uid;
        console.log('You logged in!');
        // console.log(this.myUser);
        // console.log(this.userid);
      })
      .catch(e => console.log("Error en el login:\n" + e.message));
  }

  logout() {
      this.afAuth.auth.signOut();
      console.log('You logged out!');
  }


  get
}
