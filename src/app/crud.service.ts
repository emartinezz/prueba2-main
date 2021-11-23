import { Injectable } from '@angular/core'; 

// instalar: npm install @ionic/storage-angular , agregar importación
import { Storage } from '@ionic/storage-angular';

export interface Item { rut: string, nombre: string, fono:string}


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private storage: Storage) {
    this.init();
  }
  async init()
  {
    // crear el storage de ionic para este proyecto
    await this.storage.create();
  }
}
