/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { ProjectComponent } from './project.component';
import { MaterialShareModule } from '../../testing/material.share.module';

import { ProjectService } from '../services/project.service';
import { ProjectStubService } from '../services/project.stub.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../testing/route/router-stubs';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialShareModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ProjectComponent],

      providers: [
        { provide: ProjectService, useClass: ProjectStubService },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
