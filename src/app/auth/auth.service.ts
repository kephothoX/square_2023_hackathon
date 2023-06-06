import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, catchError, of } from 'rxjs';
import CryptoJS from 'crypto-js';

import { User, UserCredentials } from '../interfaces/user';

import { ErrorService } from '../services/error.service';
import { AppService } from '../services/app.service';
import ls from 'localstorage-slim';

import { AdminUser } from 'src/app/interfaces/user';

import { initializeApp } from 'firebase/app';

import {
  persistentLocalCache,
  persistentMultipleTabManager,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  initializeFirestore,
  serverTimestamp,
} from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseConfig = {
    apiKey: "AIzaSyBcf-TpG2nQDu0_FrCGcmKJKjMnJ_8OyDM",
    authDomain: "healus-a85f5.firebaseapp.com",
    projectId: "healus-a85f5",
    storageBucket: "healus-a85f5.appspot.com",
    messagingSenderId: "499436687151",
    appId: "1:499436687151:web:6d13d1b04b82db9b159bda",
    measurementId: "G-LKZ7WTHLT7"
  };

  app = initializeApp(this.firebaseConfig);

  db = initializeFirestore(this.app,
    {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    },
  );

  constructor(
    private _errorService: ErrorService,
    private _httpClient: HttpClient,
    private _router: Router,
    private _appService: AppService,
  ) { }

  newSquareCustomer(user: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/newSquareCustomer`, user, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  async saveUserCredentials(userCreds: UserCredentials) {
    const enc_key: string = CryptoJS.enc.Base64.parse(`${userCreds.email_address}`).toString();
    const user_password: string = `${userCreds.password}`;

    const userCredentials = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      email_address: userCreds.email_address,
      password: CryptoJS.AES.encrypt(user_password, enc_key).toString(),
      isActive: false,
    };

    try {
      const docRef = doc(this.db, 'UserCredentials', `${userCreds.email_address}`);
      await setDoc(docRef, userCredentials, { merge: true });

    } catch (err: any) {
      console.log('Error Writting document', err);
    }
  }


  async saveAdminUser(userData: AdminUser) {
    const enc_key: string = CryptoJS.enc.Base64.parse(`${userData.email_address}`).toString();
    const user_password: string = `${userData.password}`;

    const adminUser = {
      id: self.crypto.randomUUID().toString().toUpperCase(),
      given_name: userData.given_name,
      family_name: userData.family_name,
      phone_number: userData.phone_number,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      email_address: userData.email_address,
      password: CryptoJS.AES.encrypt(user_password, enc_key).toString(),
      isActive: false,
      isAuthorizedAdmin: false,
    };

    try {
      const docRef = doc(this.db, 'AdminUser', `${userData.email_address}`);
      await setDoc(docRef, adminUser, { merge: true });

    } catch (err: any) {
      console.log('Error Writting document', err);
    }

  }


  getLocationId(): Observable<any> {
    return this._httpClient.get(`${this._appService.FirebaseFunctionsEndpoint}/getSquareMainLocation`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getuserByEmailAddress(email: string): Observable<any> {

    const qs = {
      "limit": 1,
      "query": {
        "filter": {
          "email_address": {
            "exact": email
          }
        }
      }
    };

    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/getSquareCustomerByEmail`, qs, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  async loginUser(data: UserCredentials) {
    const enc_key = CryptoJS.enc.Base64.parse(`${data.email_address}`).toString();
    const docRef = doc(this.db, 'UserCredentials', `${data.email_address}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      const pass: string = docData['password'];

      if (data.password == CryptoJS.AES.decrypt(docData['password'], CryptoJS.enc.Base64.parse(`${data.email_address}`).toString()).toString(CryptoJS.enc.Utf8)) {
        setTimeout(async () => {
          await updateDoc(docRef, { isActive: true });

          this.getuserByEmailAddress(`${data.email_address}`).subscribe((result: any) => {
            ls.set('auth_login_status', docData['isActive'], { encrypt: true });
            ls.set('customer_id', result.customers[0].id, { encrypt: true });
            ls.set('customer_email_address', result.customers[0].email_address, { encrypt: true });

          });

        });

        setTimeout(() => {
          this._router.navigate(['/selfcare']);
        }, 1000);

        return 'Subscribe to your preffered package.'

      } else {
        return "Wrong Credentials, Passwords didn't match.";

      }

    } else {
      return 'No user exists, with those Credentials.';

    }
  }

  async loginAdmin(data: UserCredentials) {
    const enc_key = CryptoJS.enc.Base64.parse(`${data.email_address}`).toString();
    const docRef = doc(this.db, 'AdminUser', `${data.email_address}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      const pass: string = docData['password'];

      if (data.password == CryptoJS.AES.decrypt(docData['password'], CryptoJS.enc.Base64.parse(`${data.email_address}`).toString()).toString(CryptoJS.enc.Utf8)) {
        await updateDoc(docRef, { isActive: true });

        ls.set('canLoginAsAdmin', docData['isAuthorizedAdmin'], { encrypt: true });

        setTimeout(() => {
          this._router.navigate(['/admin']);
        });

        return 'Now Logged In As Admin'

      } else {
        return "Wrong Credentials, Passwords didn't match.";

      }

    } else {
      return 'No user exists, with those Credentials.';

    }
  }

  isAdminLoggedIn(): boolean {
    return Boolean(ls.get('canLoginAsAdmin', { decrypt: true }));
  }

  isUserLoggedIn(): boolean {
    const status = Boolean(ls.get('auth_login_status', { decrypt: true }));

    if (status == true) {
      return true;
    } else {

      setTimeout(() => {
        this._router.navigate(['/selfcare/auth/signin']);
      });

      return false;
    }
  }
}
