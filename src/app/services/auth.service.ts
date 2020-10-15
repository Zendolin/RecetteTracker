import { Injectable } from '@angular/core';
import firebase from "@firebase/app"
import "@firebase/auth"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signIn(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve()
          },
          (error) => {
            reject(error)
          }
        )
      }
    )
  }

  signOut(){
    firebase.auth().signOut()
  }
}
