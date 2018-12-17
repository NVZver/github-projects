import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/app/projects/services/project.service';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil, map } from 'rxjs/operators';

class FilterState {
  project: string;
  language: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  filterState: FilterState = {
    project: '',
    language: ''
  };

  languages$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  projects$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  private _filterStateChanged: Subject<any> = new Subject();
  private _subscriptionDestroy$: Subject<boolean> = new Subject();
  private _projects: any[] = [];
  private _languages: any[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProjects();
    this.subscribeInputChange();
    this.subscribeFilterStateChange();
  }

  ngOnDestroy() {
    this._subscriptionDestroy$.next(true);
  }

  getProjects() {
    this.projectService.getProjects().subscribe(res => {
      this._projects = res.repos;
      this._languages = res.languages;
      this.languages$.next(this._languages);
      this.projects$.next(this._projects);
    });
  }

  projectClick(project: any) {
    const url = `/projects/${project.owner.login}/${project.name}/branches`;
    this.router.navigateByUrl(url);
  }

  setFilterState(property: string, value: string) {
    this.filterState[property] = value;
    this._filterStateChanged.next(this.filterState);
  }

  filterLanguage(event) {
    const language = event.target.value;
    this.setFilterState('language', language);
  }

  subscribeInputChange() {
    const input = document.getElementsByClassName('projects__organization')[0];
    fromEvent(input, 'keydown')
      .pipe(
        debounceTime(300),
        takeUntil(this._subscriptionDestroy$),
        map((event: any) => event.target.value)
      )
      .subscribe((value: any) => {
        this.setFilterState('project', value);
      });
  }

  subscribeFilterStateChange() {
    this._filterStateChanged.subscribe(state => {
      this.filterProjects(state);
    });
  }

  filterProjects(state: FilterState) {
    const projects = this._projects.filter(project => {
      const nameMatched = state.project ? this.matchProjectName(project.name, state.project) : true;
      const languageMatched = state.language ? project.language === state.language : true;

      return (nameMatched && languageMatched);
    });
    this.projects$.next(projects);
  }

  matchProjectName(target, tested) {
    const regex = new RegExp(tested, 'ig');
    return regex.test(target);
  }
}
