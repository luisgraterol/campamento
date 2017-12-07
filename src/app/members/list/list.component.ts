import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Observable';

// AngularFire2 v4
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  input: string;
  @Input() status: string = 'coordinador';


  constructor(public db: AngularFireDatabase) {
    this.items = db.list('/items', {
      // query: {
      //   orderByChild: description
      // }
    });
    this.input;
  }

  send() {
    this.items.push({
      description: this.input,
      checked: false
    });
    this.input = '';
  }

  ngOnInit() { }

}
