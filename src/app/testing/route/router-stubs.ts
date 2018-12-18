import { Component, Directive, Injectable, Input, HostListener, Output } from '@angular/core';
import { NavigationExtras, convertToParamMap, ParamMap, Params } from '@angular/router';
import { of, ReplaySubject, Observable } from 'rxjs';

@Directive({
    selector: '[routerLink]',
})
export class RouterLinkStubDirective {
    linkParams: any;
    navigatedTo: any = null;

    @Input()
    set routerLink(commands: any[] | string) {
        this.linkParams = commands;
    }

    @HostListener('click')
    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

@Directive({
    selector: '[routerLinkActive]',
    exportAs: 'routerLinkActive'
})
export class RouterLinkActiveStubDirective {
    links: any;
    linksWithHrefs: any;

    get isActive(): boolean {
        return true;
    }

    routerLinkActiveOptions: {};

    @Input()
    set routerLinkActive(data: string[] | string) {

    }
}

@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent { }

@Injectable()
export class RouterStub {
    url = '';
    readonly events: Observable<Event>;

    constructor() {
        this.events = of(new Event('navigationStart'));
    }

    navigate(commands: any[], extras?: NavigationExtras) { }
}

/**
 * An ActivateRoute test double with a `paramMap`
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
@Injectable()
export class ActivatedRouteStub {
    // Use a ReplaySubject to share previous values with subscribers
    // and pump new values into the `paramMap` observable
    /** The mock paramMap observable */

    subjectParams = new ReplaySubject<ParamMap>();

    subjectQueryParams = new ReplaySubject<ParamMap>();

    readonly paramMap = this.subjectParams.asObservable();
    readonly queryParamMap = this.subjectQueryParams.asObservable();

    private _snapshot: any;

    get snapshot() {
        return this._snapshot;
    }

    set snapshot(val) {
        this._snapshot = val;
    }

    constructor() {
        this.setParamMap({});
    }


    /** Set the paramMap observables's next value */
    setParamMap(params?: Params) {
        if (params) {
            this.subjectParams.next(convertToParamMap(params));
        }
    }

    /** Set the paramMap observables's next value */
    setQueryParamMap(params?: Params) {
        if (params) {
            this.subjectQueryParams.next(convertToParamMap(params));
        }
    }
}
