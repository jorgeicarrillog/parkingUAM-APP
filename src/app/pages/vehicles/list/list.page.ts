import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatePage } from '../create/create.page';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async addVehicle() {
    const modal = await this.modalController.create({
      component: CreatePage,
      swipeToClose: false,
      componentProps:{}
    });
    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      console.log(dataReturned);
    });
    return await modal.present();
  }
}
