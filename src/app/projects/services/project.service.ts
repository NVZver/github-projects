import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const host = 'https://api.github.com';
const options = {
    headers: {
        'Accept': 'application/vnd.github.v3+json'
    }
};

@Injectable()
export class ProjectService {

    constructor(
        private http: HttpClient
    ) {
    }

    getProjects(organization): Observable<any> {
        return this.http.request('GET', `${host}/orgs/${organization}/repos`, options).pipe(
            map((repos: any[]) => {
                const languages = [];
                repos.forEach(repo => {
                    const langIdx = languages.findIndex(lang => lang === repo.language);
                    if (langIdx === -1) {
                        languages.push(repo.language);
                    }
                });
                return { repos, languages };
            })
        );
    }

    getProjectBrunches(ownerLogin: string, repoName: string): Observable<any> {
        return this.http.request('GET', `${host}/repos/${ownerLogin}/${repoName}/branches`);
    }
}
