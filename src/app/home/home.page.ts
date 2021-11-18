import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {  Router} from '@angular/router';
import { ApirestService } from '../apirest.service';
import {  OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  listado = [];
  cosas = [];
  id = localStorage.getItem('id');
  constructor(public toastController : ToastController,
              public alertController: AlertController,
              private router : Router,
              private api: ApirestService) {}

  ngOnInit()
  {
    this.api.getPost(this.id);
    this.cosas = this.api.cosas;
  }
  logout(){
    this.router.navigate(['/usuarios']);
    localStorage.clear();
  }

}
