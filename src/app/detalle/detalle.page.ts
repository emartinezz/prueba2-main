import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApirestService } from '../apirest.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  listado = [];
  cosas = [];
  comen = [];
  comentario;
  id ;
  constructor(private activatedRouter : ActivatedRoute,
              private apirestService:ApirestService,
              private api: ApirestService,
              private router          : Router,
              private storage: Storage) { }

  async ngOnInit() {


    this.activatedRouter.paramMap.subscribe(async p => {
        this.id = p.get('id');
        this.apirestService.getComent(this.id);
        this.comen = this.apirestService.comen;
                })
              }
  async atras(){
    this.router.navigate(['/home'])
    
  }

}
