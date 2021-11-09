import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatDividerModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
