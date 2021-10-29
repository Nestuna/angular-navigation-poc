import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatPaginatorModule,
  MatSlideToggleModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
