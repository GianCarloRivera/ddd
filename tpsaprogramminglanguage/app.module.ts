import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu.component';
import { CartComponent } from './components/cart.component';
// ... other imports

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CartComponent,
    // ... other components
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 