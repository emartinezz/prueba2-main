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

  async set(key:string, valor: any)
  {// string --> json
   /* let id = await this.storage.length() + 1;
    await this.storage.set(id.toString(), valor);
*/
    await this.storage.set(valor[0].rut, valor);
  }    
  async get(key:string)
  {
    return await this.storage.get(key);
  }
  //ejercicio práctico e investigación
  listar()
  {
    let fila = [];
    this.storage.forEach((v, k) => { fila.push(v); })
    return fila;
  }
  eliminar(rut:string)
  {// eliminar no lo hace
    this.storage.remove(rut);
  }
}
