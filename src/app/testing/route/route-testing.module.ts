import { NgModule } from '@angular/core';
import {
    RouterLinkStubDirective,
    RouterLinkActiveStubDirective,
    RouterOutletStubComponent,
    RouterStub,
    ActivatedRouteStub
} from 'src/app/testing/route/router-stubs';

@NgModule({
    declarations: [
        RouterLinkStubDirective,
        RouterLinkActiveStubDirective,
        RouterOutletStubComponent
    ],
    exports: [
        RouterLinkStubDirective,
        RouterLinkActiveStubDirective,
        RouterOutletStubComponent
    ],
    providers: [
        RouterStub,
        ActivatedRouteStub,
    ]
})
export class RouteTestingModule { }
