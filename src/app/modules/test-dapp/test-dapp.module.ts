import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestDappComponent } from './test-dapp.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: TestDappComponent,
  }
];

@NgModule({
  declarations: [
    TestDappComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [
    TestDappComponent,
  ]
})
export class TestDappModule { }
