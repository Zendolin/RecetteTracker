import { Component } from '@angular/core';
import firebase from "@firebase/app"
/* In prod, don't forget to add api_keys */
import { firebase_config } from "../../api_keys";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    firebase.initializeApp(firebase_config)
  }
}
