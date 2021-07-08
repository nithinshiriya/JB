import { Component, OnInit } from '@angular/core';
import { AppService, Alert } from "./services/app.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mini-books';
  alerts: Alert[];
  constructor(private appService: AppService){    
    this.alerts= [];
  }

  ngOnInit(){
    this.appService.displayMessageEvent
    .subscribe(alert =>{
      console.log(alert);
        this.alerts.push(alert);
    });
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
