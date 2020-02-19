import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiLink=environment.apiLink;
  netConnected = true
  constructor(
    public http: HttpClient,
    public network: Network
  ) {
    this.network.onConnect().subscribe(()=>{
      this.netConnected = true
    })
    this.network.onDisconnect().subscribe(()=>{
      this.netConnected = false
    })
  }


  login(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}app-login`,
      { username:data.username,password:data.password}, httpOptions
    )
  }
  
  barber_register(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}app-barber-register`,
      { 
        first_name: data.fname,
        last_name: data.lname,
        email: data.email,
        password: data.password,
        phone: data.phone,
        username: data.username,
        shop_name: data.shopName,
        addr1: data.addr1,
        addr2: data.addr2,
        post_code: data.post_code,
        city: data.city,
        state: data.state,
        country: data.country,
        subscription: data.subscribe,
        is_stylist: data.isStylist,
      }, 
      httpOptions
    )
  }

  client_register(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}app-client-register`,
      { 
        first_name: data.fname,
        last_name: data.lname,
        email: data.email,
        password: data.password,
        phone: data.phone,
        username: data.username,
        addr1: data.addr1,
        addr2: data.addr2,
        post_code: data.post_code,
        city: data.city,
        state: data.state,
        country: data.country,
        subscription: data.subscribe,
      }, 
      httpOptions
    )
  }

  getBarberProfile(id){
    return this.http.get<any>(`${this.apiLink}app-get-barber-profile-info/${id}`);
  }

  getClientProfile(id){
    return this.http.get<any>(`${this.apiLink}app-get-client-profile/${id}`);
  }
  UpdateBarberProfile(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}app-update-profile`,
      { id:data.id,fname:data.fname,
        lname:data.lname,email:data.email,
        image:data.image,prev_image:data.prev_image,
        prev_image_thumb:data.prev_image_thumb}, httpOptions
    )
  }
  UpdateClientProfile(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}app-update-client-profile`,
      { id:data.id,fname:data.fname,
        lname:data.lname,email:data.email,
        image:data.image,prev_image:data.prev_image,
        phone:data.phone,post_code:data.post_code,
        city:data.city,state:data.state,addr1:data.addr1,
        addr2:data.addr2,country:data.country
      }, httpOptions
    )
  }

  forgetUserPass(email){
    return this.http.get<any>(`${this.apiLink}app-forget-user?email=${email}`);
  }
  codeValidateUserPass(data){
    return this.http.get<any>(`${this.apiLink}app-chek-reset-code-user?username=${data.userName}&code=${data.code}&type=${data.type}`);
  }
  
  resetPassword(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}app-reset-forgotten-password`,
      { type:data.type,username:data.username,
        password:data.password}, httpOptions
    )
  }

  getCountries(){
    return this.http.get<any>(`${this.apiLink}app-get-countries`);
  }
  getStates(countryId){
    return this.http.get<any>(`${this.apiLink}app-get-states?countryId=${countryId}`);
  }

  // updateProfile(data){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     })
  //   };
  //   return this.http.post<any>(
  //     `${this.apiLink}`,
  //     { 
  //       action: 'update-profile',
  //       id: data.id,
  //       fname: data.fname,
  //       lname: data.lname,
  //       email: data.email,
  //       phone: data.phone,
  //       address: data.address,
  //       nominy_name: data.nominy_name,
  //       nominy_phone: data.nominy_phone,
  //       relation: data.relation,
  //     }, 
  //     httpOptions
  //   )
  // }

  // getUserDetail(id){
  //   return this.http.get<any>(`${this.apiLink}/${id}?action=getUserDetail`);
  // }

  // updatePassword(data){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     })
  //   };
  //   return this.http.post<any>(
  //     `${this.apiLink}`,
  //     { 
  //       action: 'update-password',
  //       id: data.id,
  //       new_pass: data.new_pass
  //     }, 
  //     httpOptions
  //   )
  // }

  // forgotPassword(data){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     })
  //   };
  //   return this.http.post<any>(
  //     `${this.apiLink}`,
  //     { 
  //       action: 'forgot-password',
  //       email: data.email,
  //     }, 
  //     httpOptions
  //   )
  // }

  // checkPassCode(data){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     })
  //   };
  //   return this.http.post<any>(
  //     `${this.apiLink}`,
  //     { 
  //       action: 'forgot-password-code_check',
  //       email: data.email,
  //       code: data.code,
  //     }, 
  //     httpOptions
  //   )
  // }

  // changePassword(data){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     })
  //   };
  //   return this.http.post<any>(
  //     `${this.apiLink}`,
  //     { 
  //       action: 'change-password',
  //       email: data.email,
  //       new_pass: data.new_pass,
  //     }, 
  //     httpOptions
  //   )
  // }
}
