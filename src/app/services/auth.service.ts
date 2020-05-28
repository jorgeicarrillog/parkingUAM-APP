import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { environment } from '../../environments/environment';

const URL = environment.url;
const { Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  info:any;
  constructor(private http:HttpClient) { 
    Device.getInfo().then(info=>{
      this.info = info;
    });
  }

  public _addStandardHeaders(header:HttpHeaders)
  {
    header = header.append('X-Requested-With','XMLHttpRequest');
    
    return header;
  }

  loginSocial(body,type:string){
    let reqOpts = {
       headers: this._addStandardHeaders(new HttpHeaders()),
       params: new HttpParams(body)
      };

    body.client_id = environment.client_id;
    body.client_secret = environment.client_secret;
    body.grant_type = 'social';
    body.scope = '*';
    body.provider = 'APP';
    body.name = body.displayName;
    body.image = body.photoURL;
    body.social_provider = type;
    body.provider_user_id = body.uid;
    body.logInfo = {
      platform:this.info.platform,
      type:'APP',
      device:this.info.model,
      platform_version:this.info.osVersion,
      browser:this.info.appBuild,
      browser_version:this.info.appVersion

    };

    return this.http.post(`${ URL }/api/login/${type}`,body,reqOpts);
  }

  processErrorMessage(resp):string{
    console.log(resp);
    let messageError = '';
    if (resp.error && 'object' == typeof resp.error && 'undefined' != typeof resp.error) {
      messageError += '<ul style="text-align:left;">';
      for (const key in resp.error) {
        if (resp.error.hasOwnProperty(key)) {
          const element = resp.error[key];
          if('object' == typeof element){
            for (const keys in element) {
              if (element.hasOwnProperty(keys)) {
                const elementSub = element[keys];
                console.log(elementSub);
                messageError += '<li><small>'+elementSub+'</small></li>';
              }
            }
          }else{
            messageError += '<li><small>'+element+'</small></li>';
          }
          
        }
      }
      messageError += '</ul>';
    }else{
      messageError = resp.error;
    }

    return messageError;
  }
}
