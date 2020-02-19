import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.page.html',
  styleUrls: ['./searchresult.page.scss'],
})
export class SearchresultPage implements OnInit {
  apiLink=environment.apiLink;
  data = []
  constructor(
    public storage: Storage,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.storage.get('found_data').then(val=>{
      //console.log('data: '+val)
      this.data = JSON.parse(val)
      //this.storage.remove('found_data')
      console.log(this.data)
    })
  }

}
