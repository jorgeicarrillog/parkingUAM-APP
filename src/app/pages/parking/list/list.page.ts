import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }
  
  openMenu() {
    this.menu.enable(true, 'home-menu');
    this.menu.open('home-menu');
  }

}
