 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Storage } from '@ionic/storage';
import { ClientService } from '../services/client.service';
import { environment } from '../../environments/environment';

 
 
@Component({
  selector: 'app-cdashbord',
  templateUrl: './cdashbord.page.html',
  styleUrls: ['./cdashbord.page.scss'],
})
 
export class CdashbordPage implements OnInit {

  apiLink=environment.apiLink;
  fav_stylist = []
  gallery = []
  name = ''
  
  constructor(
    private router: Router,
    public storage: Storage,
    public clientService: ClientService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('user_info').then(val=>{
      //console.log(val)
      this.name = val.fname+" "+val.lname
      this.clientService.getMyHomepageInfo(val.id).subscribe(res=>{
        console.log(res)
        this.fav_stylist = res.stylist
        this.gallery = res.gallery
      })
    })
  }
  viewPhoto(){
    
  }
  serachBarber() {
    this.router.navigateByUrl('/ctabs/ctabs/tab3');
  }
  addCutPhoto() {
  }
}
