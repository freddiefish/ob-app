import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatSelectModule, MatDialogModule, MatIconModule, MatMenuModule, MatExpansionModule,
  MatSliderModule, MatFormFieldModule, MatInputModule } from '@angular/material';

const MATERIAL_MODULES = [
  MatDialogModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatExpansionModule,
  MatSliderModule,
  MatFormFieldModule,
  MatInputModule
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
