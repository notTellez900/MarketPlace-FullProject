import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { Router, ActivatedRoute } from '@angular/router';


import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})

export class ItemFormComponent implements OnInit {

  @Output() itemUpdated = new EventEmitter<boolean>();
  @Output() itemCreated = new EventEmitter<any>();

  @HostBinding('class') classes = 'row';

  item: Item = {
    id: 0,
    nombre: '',
    descripcion: '',
    fecha_creacion: new Date(),
    precio: 0,
    stock: 0,
    imagen: '',
    id_Categoria: 0
  };

  categorias: any = [];
  
  edit: boolean = false;

  constructor(private itemService: ItemsService, private route: Router, private activatedRoute: ActivatedRoute){

  }
  ngOnInit(){
    
    const params = this.activatedRoute.snapshot.params;
    if(params['id']){
      this.itemService.getItem(params['id']).subscribe(
        res =>{
          console.log(res);
          this.item = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
    
    this.itemService.getCategorias().subscribe(
      res => {
        this.categorias = res;
      },
      err => console.error(err)
    )
  }

  

  saveNewItem(){
    delete this.item.fecha_creacion;
    delete this.item.id;
    console.log(this.item);
    this.itemService.saveItem(this.item).subscribe(
      (res: Item) => {
        console.log(res);
        this.route.navigate(['/items']).then(()=>{
          this.itemCreated.emit(res);
        });
      },
      err => console.error(err)
    );
  }

  updateItem(){
    delete this.item.fecha_creacion;
    delete this.item.categoria_nombre;
    if(this.item.id !== undefined){
      this.itemService.updateItem(this.item.id,this.item).subscribe(
        res => {
          console.log(res);
          this.itemUpdated.emit(true);
          this.route.navigate(['/items']);
        },
        err => console.error(err)
      )
    }else{
      console.error('Item Id no está definido');
    }
  }
}
