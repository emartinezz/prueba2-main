import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado = [];
  cosas = [];
  comen = [];

  datos : any;
  private apiURL = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient,
              private storage: Storage) {
                this.init();}
          async init(){
            await this.storage.create();
          }      
               
   getUsers()
  {
    let url = this.apiURL + 'users';
    
    return new Promise((resolve, reject) =>
    {
      this.http.get(url).subscribe((data: []) =>
      {
        data.forEach(item => { this.listado.push(item); });
        //console.table(this.listado);
      },
      error => { console.log("error en la solicitud")
      })
    })
  }
  getUser(id:String)
  {
    let url = this.apiURL + 'users/' + id;
    
    return new Promise((resolve, reject) =>
    {
      this.http.get(url).subscribe((data: any) =>
      {
        this.datos = data;
        console.log(this.datos);
      },
      error => { console.log("error en la solicitud")
      })
    })
  }

  getPost(id:String)
  {
    let url = this.apiURL + 'users/'+ id + '/posts';
    this.cosas = [];
    return new Promise((resolve, reject) =>
    {
      this.http.get(url).subscribe((data: []) =>
      {
        data.forEach(item => { this.cosas.push(item); });
        //console.table(this.listado);
      },
      error => { console.log("error en la solicitud")
      })
    })
  }
  getComent(id:String)
  {
    let url = this.apiURL + 'posts/'+ id + '/comments';
    this.comen = [];
    return new Promise((resolve, reject) =>
    {
      this.http.get(url).subscribe((data: []) =>
      {
        data.forEach(item => { this.comen.push(item); });
        //console.table(this.listado);
        for (let i = 0; i< this.comen.length; i++)
        {
          const elemento = i;
          this.storage.set("post"+elemento, this.comen[elemento]);
        }
        //this.storage.set('comentario',this.comen);
      },
      error => { console.log("error en la solicitud")
      for (let i = 0; i < 5; i++){
        const elemento = i;
        this.storage.get("post"+String(elemento)).then(item => {this.comen.push(item)});
      }
      })
    })
  }


}
