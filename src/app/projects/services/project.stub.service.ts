import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProjectStubService {

    getProjects(organization): Observable<any> {
        return of({ repos: [], languages: [] });
    }

    getProjectBrunches(ownerLogin: string, repoName: string): Observable<any> {
        return of([]);
    }
}
