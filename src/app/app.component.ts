import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AppPWA';
  apiData: any;

  constructor(private htpp: HttpClient, private update: SwUpdate){
    this.UpdateClient();
  }

  ngOnInit() {
    this.htpp.get('http://dummy.restapiexample.com/api/v1/employees').subscribe(
      (res: any) => {
        this.apiData = res.data;
      },
      (err) => {
        console.error(err);
      }
    )
  }

  UpdateClient() {
    if(!this.update.isEnabled) {
      console.log('Not Enabled');
      return
    }

    this.update.available.subscribe((event) => {
      console.log('current', event.current, 'available', event.available);
      if(confirm('update available')){
        this.update.activateUpdate().then(() => location.reload());
      }
    });

    this.update.activated.subscribe((event) => {
      console.log('current', event.previous, 'available', event.current);
    })

  }
}
