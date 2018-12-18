import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/app/projects/services/project.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
  inputOwnerValue = '';
  owner = undefined;
  private _filterStateChanged$: Subject<any> = new Subject();
  private _subscriptionDestroy$: Subject<boolean> = new Subject();
  private _projects: any[] = [];
  private _languages: any[] = [];

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscribeRouteChange();
    this.subscribeProjectNameChange();
    this.subscribeFilterStateChange();
  }

  ngOnDestroy() {
    this._subscriptionDestroy$.next(true);
  }

  getProjects(organization) {
    this.projectService.getProjects(organization).subscribe(res => {
      this._projects = res.repos;
      if (this._projects.length) {
        this.owner = this._projects[0].owner;
      }
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
    this._filterStateChanged$.next(this.filterState);
  }

  filterLanguage(language) {
    this.setFilterState('language', language);
  }

  submitOwner(owner) {
    this.router.navigate([], { queryParams: { owner } });
  }

  subscribeRouteChange() {
    this.activatedRoute.queryParamMap
      .pipe(
        takeUntil(this._subscriptionDestroy$)
      )
      .subscribe((paramMap: ParamMap) => {
        const owner = paramMap.get('owner');
        if (owner) {
          this.inputOwnerValue = owner;
          this.getProjects(owner);
        }
      });
  }

  subscribeProjectNameChange() {
    const inputProjectName = document.getElementsByClassName('projects__name')[0];
    if (inputProjectName) {
      this.subscribeInputChange(inputProjectName, (value) => { this.setFilterState('project', value); });
    }
  }

  subscribeInputChange(element: Element, callback: Function) {
    fromEvent(element, 'keydown')
      .pipe(
        debounceTime(300),
        takeUntil(this._subscriptionDestroy$),
        map((event: any) => event.target.value)
      )
      .subscribe((value: any) => {
        callback(value);
      });
  }

  subscribeFilterStateChange() {
    this._filterStateChanged$.subscribe(state => {
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
