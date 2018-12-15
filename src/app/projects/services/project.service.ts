import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const host = 'https://api.github.com';

@Injectable()
export class ProjectService {

    constructor(
        private http: HttpClient
    ) {
    }

    getProjects(opts?: {
        page?: number,
        companyName?: string
    }): Observable<any> {
        const options = {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        };
        return this.http.request('GET', `${host}/orgs/payworks/repos`, options);
    }
}
