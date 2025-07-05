import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { FormsModule } from '@angular/forms'; // Ensure this is imported

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProductListComponent,
    AddProductComponent,
    PlaceOrderComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule // Confirm this is present
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }