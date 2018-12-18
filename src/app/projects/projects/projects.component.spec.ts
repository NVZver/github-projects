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
});
