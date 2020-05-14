import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private menu:MenuController, private navCtrl:NavController) { }

  ngOnInit() {}

  navTo(route:string){
    this.menu.close('home-menu');
    this.menu.enable(false, 'home-menu');
    this.navCtrl.navigateForward(route);
  }

}
