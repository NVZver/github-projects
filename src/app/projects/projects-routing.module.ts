import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from 'src/app/projects/projects/projects.component';
import { ProjectComponent } from 'src/app/projects/project/project.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectsComponent
    },
    {
        path: ':owner/:repo/branches',
        component: ProjectComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule { }
