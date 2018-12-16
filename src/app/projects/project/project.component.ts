import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/projects/services/project.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  branches: any[] = [];
  owner = '';
  repo = '';

  constructor(
    private projectService: ProjectService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(map => {
      console.log(map);
      this.owner = map['params']['owner'];
      this.repo = map['params']['repo'];
      this.projectService.getProjectBrunches(this.owner, this.repo).subscribe(res => {
        console.log(res);
        this.branches = res;
      });
    });
  }

  back() {
    this.location.back();
  }

}
