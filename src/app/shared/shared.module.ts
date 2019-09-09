import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatIconModule, MatMenuModule, MatExpansionModule } from '@angular/material';

const MATERIAL_MODULES = [
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatExpansionModule,
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    ...MATERIAL_MODULES,
    CommonModule,
  ],
})
export class SharedModule { }
