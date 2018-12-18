import { NgModule } from '@angular/core';
import {
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule
} from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatChipsModule
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatChipsModule
    ]
})
export class MaterialShareModule {

}
