import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { CatFormComponent } from './components/cat-form/cat-form.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { CatListComponent } from './components/cat-list/cat-list.component';

import { ItemsService } from './services/items.service';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ItemFormComponent,
    CatFormComponent,
    ItemListComponent,
    CatListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
