import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BarberService {

  apiLink=environment.apiLink;

  constructor(
    public http: HttpClient
  ) { }

  getMyHomepageInfo(id){
    return this.http.get<any>(`${this.apiLink}app-get-my-homepage-info/${id}`);
  }

  getEditLocationInfo(id){
    return this.http.get<any>(`${this.apiLink}app-get-edit-location-info/${id}`);
  }
  


  addService(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}app-create-service`,
      { service_name:data.service_name,duration:data.duration,price:data.price,emp_id:data.emp_id,description:data.desc}, httpOptions
    )
  }

 

  saveGallery(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}app-save-gallery`,
      { image:data.image,emp_id:data.emp_id}, httpOptions
    )
  }

  updateBarberInfo(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}app-update-barber-info`,
      { 
        emp_id:data.emp_id,shop_name:data.shop_name,addr1:data.addr1,
        addr2:data.addr2,city:data.city,state:data.state,
        post_code:data.post_code,country:data.country,

        sunOpen:data.sunOpen,sunSt:data.sunSt,sunEn:data.sunEn,
        monOpen:data.monOpen,monSt:data.monSt,monEn:data.monEn,
        tueOpen:data.tueOpen,tueSt:data.tueSt,tueEn:data.tueEn,
        wedOpen:data.wedOpen,wedSt:data.wedSt,wedEn:data.wedEn,
        thuOpen:data.thuOpen,thuSt:data.thuSt,thuEn:data.thuEn,
        friOpen:data.friOpen,friSt:data.friSt,friEn:data.friEn,
        satOpen:data.satOpen,satSt:data.satSt,satEn:data.satEn,

      }, httpOptions
    )
  }

  getBookingInfo(id,userId){
    return this.http.get<any>(`${this.apiLink}app-get-booking-info/${id}/${userId}`);
  }

  changePassword(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}app-cng-barber-pass`,
      { id:data.id,oldPass:data.oldPass,newPass:data.newPass}, httpOptions
    )
  }

  getMyBooking(barberId,date){
    return this.http.get<any>(`${this.apiLink}app-get-barber-booking/${barberId}?date=${date}`);
  }

  confirm(bookingId){
    return this.http.get<any>(`${this.apiLink}app-barber-confirm-booking?bookingId=${bookingId}`);
  }
  cancel(bookingId){
    return this.http.get<any>(`${this.apiLink}app-barber-cancel-booking?bookingId=${bookingId}`);
  }

  
  
  
}
