import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiLink=environment.apiLink;
  
  constructor(
    public http: HttpClient
  ) { }

  getMyHomepageInfo(id){
    return this.http.get<any>(`${this.apiLink}app-get-my-home-info/${id}`);
  }

  getBarberProfile(id,userId=0){
    return this.http.get<any>(`${this.apiLink}app-get-barber-profile/${id}/${userId}`);
  }

  addReview(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}app-add-review`,
      { client_id:data.client_id,emp_id:data.emp_id,star:data.star,message:data.message}, httpOptions
    )
  }

  getMyFavs(id){
    return this.http.get<any>(`${this.apiLink}app-get-my-favs/${id}`);
  }
  removeMyFav(id){
    return this.http.get<any>(`${this.apiLink}app-remove-my-favs/${id}`);
  }

  removeMyGallery(id){
    return this.http.get<any>(`${this.apiLink}app-remove-clients-gallery/${id}`);
  }
  // for stylists
  makeFav(id,userId){
    return this.http.get<any>(`${this.apiLink}app-make-fav/${id}/${userId}`);
  }
  rmvFav(id,userId){
    return this.http.get<any>(`${this.apiLink}app-rmv-fav/${id}/${userId}`);
  }

  // for style image
  makeFavStyle(id,userId){
    return this.http.get<any>(`${this.apiLink}app-make-fav-style/${id}/${userId}`);
  }
  rmvFavStyle(fav_id){
    return this.http.get<any>(`${this.apiLink}app-rmv-fav-style/${fav_id}`);
  }

  findBarber(barber,stylist,zip){
    return this.http.get<any>(`${this.apiLink}app-find-barber?barber=${barber}&stylist=${stylist}&zip=${zip}`);
  }

  getBookingSchedule(data){
    return this.http.get<any>(`${this.apiLink}app-get-booking-schedule?barber_id=${data.barber_id}&date=${data.date}&day=${data.day}&diff=${data.diff}`);
  }

  makeBooking(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}app-make-booking`,
      { client_id:data.userId,emp_id:data.empId,
        start_time:data.st_time,end_time:data.en_time,
        total_price:data.total_price,date:data.date,
        date_check:data.date_check,services: data.services
      }, httpOptions
    )
  }

  getMyBooking(userId){
    return this.http.get<any>(`${this.apiLink}app-get-my-bookings?id=${userId}`);
  }


  bookingConfirm(bookingId){
    return this.http.get<any>(`${this.apiLink}app-booking-confirm?booking_id=${bookingId}`);
  }
  bookingCancel(bookingId){
    return this.http.get<any>(`${this.apiLink}app-booking-cancel?booking_id=${bookingId}`);
  }

  // getMygallery(id){
  //   return this.http.get<any>(`${this.apiLink}app-get-my-gallery/${id}`);
  // }

  // saveGallery(data){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     })
  //   };
  //   return this.http.post<any>(
  //     `${this.apiLink}app-save-gallery`,
  //     { image:data.image,emp_id:data.emp_id}, httpOptions
  //   )
  // }

  // getMybookings(id){
  //   return this.http.get<any>(`${this.apiLink}app-get-my-bookings/${id}`);
  // }
  // getMyreviews(id){
  //   return this.http.get<any>(`${this.apiLink}app-get-my-reviews/${id}`);
  // }

  
  
  
}
