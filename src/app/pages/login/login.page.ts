import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import * as firebase from "firebase/app";
import { UserInfo } from 'firebase/app';
import { cfaSignIn as cfaSignInAlternate, SignInResult } from 'capacitor-firebase-auth/alternative';
import { AuthService } from '../../services/auth.service';
import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loader:any;

  constructor(
    private authService:AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private storage:NativeStorage,
    public navCtrl: NavController,
    ) { }

  ngOnInit() {
  }

  async loginGoogle(){
    let googleUser = await Plugins.GoogleAuth.signIn()
    console.log(googleUser);
  }

  loginGoogle2(){
    this.loaderShow();
    cfaSignInAlternate('google.com').subscribe(
      ({userCredential, result}: {userCredential: firebase.auth.UserCredential, result: SignInResult}) => {
         console.log(userCredential);
         console.log(result);
         var user:UserInfo = {
            displayName: userCredential.user.displayName,
            email: userCredential.user.email,
            phoneNumber: userCredential.user.phoneNumber,
            photoURL: userCredential.user.photoURL,
            providerId: userCredential.user.providerId,
            uid: userCredential.user.uid
          };
         if(user.email === null || user.email.length<=0 && userCredential.user.providerData.length>0){
           user.email = userCredential.user.providerData[0].email;
         }else if(user.email === null || user.email.length<=0 && userCredential.additionalUserInfo && userCredential.additionalUserInfo.profile){
          user.email = userCredential.additionalUserInfo.profile['email'];
         }
         this.authService.loginSocial(user,'Google')
         .subscribe(
           (resp:ResponseAuth) => {
           console.log(resp);
           this.loaderHide();
           if(resp.access_token && resp.access_token.length>0){
             this.storage.setItem('access_token', resp.access_token);
             this.storage.setItem('user', resp.user);
             this.alert('Bienvenido '+resp.user.name);
             this.reditectoToHome();
           }else{
            this.loaderHide();
            this.alert(this.authService.processErrorMessage(resp));
           }
         },
         (err) => {
          console.log(err);
           this.loaderHide();
           this.alert(this.authService.processErrorMessage(err));
         });
        },
        (err) => {
          console.log(err);
          this.loaderHide();
        }
    );
  }

  reditectoToHome(){
    this.navCtrl.navigateRoot("home");
  }

  async loaderInit(){
    this.loader = await this.loadingController.create({
      message: 'Cargando, espera por favor...',
    });
  }

  async loaderShow() {
    await this.loader.present();
  }

  async loaderHide() {
    await this.loader.dismiss();
  }

  async alert(message:string){
    const alert = await this.alertController.create({
      header: 'Medca',
      message: message,
      buttons: ['OK']
    });
    this.loaderHide();

    await alert.present();
  }

}

export interface ResponseAuth{
  success:boolean,
  errors?:any,
  message?:any,
  user?:User,
  access_token?:string
};

export interface User{
  id:number,
  name:string,
  last_name: string,
  email:string,
  city_id: number,
  image?: string,
  phone?: string,
  address?: string,
  email_verified_at?: string,
  created_at?: string,
  updated_at?: string
};
