import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import * as layout from './layout';
@NgModule({
	declarations: [ ...layout.components ], //inside module
	imports: [ CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule ],
	exports: [ ...layout.components, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, HttpClientModule ] //ouside module
})
export class SharedModule {}
