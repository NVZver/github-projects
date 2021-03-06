import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectService } from 'src/app/projects/services/project.service';
import { CommonModule } from '@angular/common';
import {
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule
} from '@angular/material';
import { ProjectComponent } from 'src/app/projects/project/project.component';
import { ProjectsRoutingModule } from 'src/app/projects/projects-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatChipsModule
    ],
    declarations: [
        ProjectsComponent,
        ProjectComponent
    ],
    exports: [
        ProjectsComponent
    ],
    providers: [
        ProjectService
    ]
})
export class ProjectsModule { }
