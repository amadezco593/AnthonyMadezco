import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankProductListComponent } from './components/bank-product-list/bank-product-list.component';
import { BankProductCreateComponent } from './components/bank-product-create/bank-product-create.component';
import { BankProductEditComponent } from './components/bank-product-edit/bank-product-edit.component';

const routes: Routes = [
  {path:'', component:BankProductListComponent},
  {path:'create', component:BankProductCreateComponent},
  {path:'edit/:id', component:BankProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
