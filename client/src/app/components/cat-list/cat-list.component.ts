import { Component, HostBinding, OnInit } from '@angular/core';
import { Router ,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CatsService } from '../../services/cats.service';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css']
})


export class CatListComponent implements OnInit{
  @HostBinding('class') classes = 'row';

  cats: any = [];


  constructor(private catsService: CatsService, private router: Router){
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.getItems();
    });
  }

  ngOnInit(){
    this.getItems();
  }

  onItemUpdated(updated: boolean) {
    if (updated) {
      this.getItems();
    }
  }

  onItemCreated(newItem: any) {
    this.cats.push(newItem);
  }

  getItems(){
    this.catsService.getItems().subscribe(
      res => {
        this.cats = res;
      }, err => console.log(err)
    );
  }

  deleteItem(id: string){
    this.catsService.deleteItem(id).subscribe(
      res => {
        console.log(res);
        this.cats = this.cats.filter((item: { id: string; }) => item.id !== id);
      },
      err => console.log(err)
    )
  }
}
