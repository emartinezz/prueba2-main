import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../apirest.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  listado = [];
  id;
  constructor(private api: ApirestService,    public alertController: AlertController, 
    private alertControl    : AlertController,
    private router          : Router,
    public toastController: ToastController) { 
    
  }

  

  ngOnInit() {
    this.api.getUsers();
    this.listado = this.api.listado;
  }
  async login(usuario:HTMLInputElement, clave:HTMLInputElement)
  {
    const user = usuario.value;
    const cla = clave.value;

    if(this.listado.length > 0){
      for(let item of this.listado){
        if(user == item.username && cla == '1234'){
          localStorage.setItem('id',item.id);
          console.log(item.id);
          this.router.navigate(['/home']);

          const toast = await this.toastController.create({
            message: 'Usuario Correcto.',
            duration: 250
          });
          toast.present();
          usuario.value = "";
          clave.value = "";
        }
        else if (user.trim().length <= 3 && cla.trim().length <= 3){
          const toast = await this.toastController.create({
            message: 'Usuario incorrecto.',
            duration: 250
          });
          toast.present();
          usuario.value = "";
          clave.value = "";
          console.log('Credenciales incorrectas');
        }

        else if (cla != "1234"){
          const toast = await this.toastController.create({
            message: 'Contraseña incorrecta.',
            duration: 2000
          });
          toast.present();
          usuario.value = "";
          clave.value = "";
        }
      }
    }
  }
 
}
