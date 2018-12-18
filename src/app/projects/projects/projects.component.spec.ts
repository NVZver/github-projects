/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProjectsComponent } from './projects.component';
import { MaterialShareModule } from '../../testing/material.share.module';
import { RouteTestingModule } from '../../testing/route/route-testing.module';
import { ProjectService } from '../services/project.service';
import { ProjectStubService } from '../services/project.stub.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../testing/route/router-stubs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterState } from '../models/filter-state';
import { isEqual } from 'lodash';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialShareModule,
        NoopAnimationsModule,
        RouteTestingModule
      ],
      declarations: [ProjectsComponent],
      providers: [
        { provide: ProjectService, useClass: ProjectStubService },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter by filter state', () => {
    const data = [
      { name: 'project', language: 'Java' },
      { name: 'project1', language: 'JavaScript' },
      { name: 'project1.1', language: 'JavaScript' },
      { name: 'prjct1', language: 'JavaScript' },
      { name: 'project2', language: 'C#' },
      { name: 'project3', language: 'C#' },
      { name: 'project4', language: 'C++' },
    ];
    component.projects = data;
    const filterState: FilterState = { project: 'project', language: 'JavaScript' };
    const target = [
      { name: 'project1', language: 'JavaScript' },
      { name: 'project1.1', language: 'JavaScript' },
    ];
    const result = component.filterProjects(filterState);


    expect(isEqual(result, target)).toBe(true);
  });

  it('should match a project by its name', () => {
    const data1 = 'project.with.a.long.name';
    const target1 = true;
    const data2 = 'qwer';
    const target2 = false;
    const matchcedData = 'with.A.Lon';

    expect(component.matchProjectName(data1, matchcedData)).toBe(target1);
    expect(component.matchProjectName(data2, matchcedData)).toBe(target2);

  });
});
