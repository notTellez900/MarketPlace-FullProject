import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { Categoria } from 'src/app/models/Cat';
import { Router, ActivatedRoute } from '@angular/router';

import { CatsService } from 'src/app/services/cats.service';


@Component({
  selector: 'app-cat-form',
  templateUrl: './cat-form.component.html',
  styleUrls: ['./cat-form.component.css']
})
export class CatFormComponent implements OnInit {

  @Output() itemUpdated = new EventEmitter<boolean>();
  @Output() itemCreated = new EventEmitter<any>();

  @HostBinding('class') classes = 'row';

  categoria: Categoria = {
    id: 0,
    nombre: '',
    descripcion: ''
  }

  edit: boolean = false;

  constructor(private catService: CatsService, private router: Router, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(){
    const params = this.activatedRoute.snapshot.params;
    if(params['id']){
      this.catService.getItem(params['id']).subscribe(
        res =>{
          console.log(res);
          this.categoria = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  saveNewItem(){
    delete this.categoria.id;
    console.log(this.categoria);
    this.catService.saveItem(this.categoria).subscribe(
      res => {
        console.log(res);
        this.itemCreated.emit(res);
        this.router.navigate(['/cats']);
      },
      err => console.error(err)
    );
  }

  updateItem(){
    if(this.categoria.id !== undefined){
      this.catService.updateItem(this.categoria.id,this.categoria).subscribe(
        res => {
          console.log(res);
          this.itemUpdated.emit(true);
          this.router.navigate(['/cats']);
        },
        err => console.error(err)
      )
    }else{
      console.error('Item Id no está definido');
    }
  }
}
