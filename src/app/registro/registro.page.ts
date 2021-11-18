import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { CrudService } from '../crud.service';
AlertController
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  listado = [];
  nombreUsuario = "";
  fonoUsuario = "";
  rutUsuario = "";
  constructor(private crud: CrudService,
              private alertController: AlertController,
              private toastController: ToastController,
              ) { }

  ngOnInit() {
   /* this.crud.set("1", "Bob Esponja");
    const nombre = this.crud.get("1");
    nombre.then(x => console.log(x));*/
  }

  async agregar(rut: HTMLInputElement, nombre: HTMLInputElement, fono:HTMLInputElement)
  {
    //Ejercicio: validar que los input no lleguen vacios
    
    if(rut.value.trim().length == 0)
    {
      const toast = await this.toastController.create({
        message: 'El rut no fue especificado',
        duration: 3000,
        color : "danger",
        position: "middle"
      });
      toast.present();
    }
    else if(nombre.value.trim().length == 0)
    {
      const toast = await this.toastController.create({
        message: 'El nombre no fue especificado',
        duration: 3000,
        color : "danger",
        position: "middle"
      });
      toast.present();
    }
    else if(fono.value.trim().length == 0)
    {
      const toast = await this.toastController.create({
        message: 'El fono no fue especificado',
        duration: 3000,
        color : "danger",
        position: "middle"
      });
      toast.present();
    }
    else
    {      
      const datos = [{"rut": rut.value  , "nombre": nombre.value , "fono": fono.value}];
      
      // Buscar el rut (key), si existe preguntar si se modifica
      const valor = await this.crud.get(rut.value);

      if(valor != null  && valor.length > 0)
      {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'El Rut ya existe, ¿Desea cambiar los datos?',
          message: '<strong>¿Está seguro?</strong>!!!',
          buttons: [
            {
              text: 'No',
              role: 'cancel'        
            }, {
              text: 'Si',                        
              handler: () => {
                
                this.crud.set(rut.value, datos);
                console.log(datos); 
                rut.value=""; // el input queda en blanco
                nombre.value="";
                fono.value="";
              }
            }
          ]
        });
        await alert.present();    
      
      }
      else
      {
        this.crud.set(rut.value, datos);
        //console.log(datos);
        rut.value=""; // el input queda en blanco
        nombre.value="";
        fono.value=""; 
        const toast = await this.toastController.create({
          message: 'Los datos fueron guardados',
          duration: 3000,
          color : "success",
          position: "middle"
        });
        toast.present();
      }
    
    }
  }
  async buscar(rut:HTMLInputElement)
  {
    if(rut.value.trim().length == 0)
    {
      const toast = await this.toastController.create({
        message: 'Debe especificar un rut válido',
        duration: 3000,
        color : "danger"
      });
      toast.present();
    }
    else
    {
      const valor = await this.crud.get(rut.value);   

      if(valor == null)
      {
        const toast = await this.toastController.create({
          message: 'El rut no existe',
          duration: 3000,
          color : "danger"
        });
        toast.present();
      }
      else
      {
        this.nombreUsuario = valor[0].nombre;
        this.fonoUsuario = valor[0].fono;
        this.rutUsuario = rut.value;
        this.listado = [];
        rut.value="";
      }
    }
  }
  listar(){
    this.nombreUsuario = "";
    this.fonoUsuario = ""; 
    this.rutUsuario = "";
    this.listado = this.crud.listar();
  }
  async eliminar()
  {
    // TAREA/EJERCICIO: SOLICITAR CONFIRMAR LA ELIMINACION DEL CONTACTO (alertController)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar usuario',
      message: '<strong>¿Estás seguro?</strong>',
      buttons: [
      {
        text: 'No',
        role: 'cancel'
      }, {
        text: 'Si',
        handler: async () => {
          this.crud.eliminar(this.rutUsuario);
          const toast = await this.toastController.create({
            message: 'Los datos fueron elimiandos',
            duration: 3000,
            color: "success"
          });
          toast.present();
          this.nombreUsuario = "";

        }  
      }] 
    });     
    await alert.present();
  }
  limpiar(rut: HTMLInputElement, nombre: HTMLInputElement, fono:HTMLInputElement)
  {
    this.nombreUsuario = "";
    this.fonoUsuario = ""; 
    this.rutUsuario = "";
    this.listado =[];
    rut.value=""; 
    nombre.value="";
    fono.value="";
  }
  
}
