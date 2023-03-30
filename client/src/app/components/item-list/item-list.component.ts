import { Component, OnInit, HostBinding } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit{
  @HostBinding('class') classes = 'row';

  items: any = [];


  constructor(private itemsService: ItemsService, private router: Router){
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      if (this.router.url === '/items') {
        this.getItems();
      }
    });
  }

  ngOnInit() {
    this.getItems();
  }

  onItemUpdated(updated: boolean) {
    if (updated) {
      this.getItems();
    }
  }

  onItemCreated(newItem: any) {
    this.items.push(newItem);
  }

  getItems(){
    this.itemsService.getItems().subscribe(
      res => {
        this.items = res;
      }, err => console.log(err)
    );
  }

  deleteItem(id: string){
    this.itemsService.deleteItem(id).subscribe(
      res => {
        console.log(res);
        this.items = this.items.filter((item: { id: string; }) => item.id !== id);
      },
      err => console.log(err)
    )
  }
}
