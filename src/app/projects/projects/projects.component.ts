import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/projects/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: any[] = [];
  languages: any[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(res => {
      this.projects = res.repos;
      this.languages = res.languages;
      console.log(this.projects, this.languages);
    });
  }
  projectClick(project: any) {
    const url = `/projects/${project.owner.login}/${project.name}/branches`;
    this.router.navigateByUrl(url);
  }
}
