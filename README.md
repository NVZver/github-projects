# GithubProjects

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Tools and frameworks
* Angular 6 is used because it's the most familiar framework to me. The same application we could implement using ReactJS or Vue.
* Angular Material is used because there are a lot of great and tested components which are the most compatible with Angular.
Also we could use other UI components, e.g Clarity DS or Semantic UI or just CSS.

## Application structure
AppModule - the main module of the app which contains all other ones  
ProjectsModule - a module for getting and displaying of Github projects  
  ProjectComponent - a page of the web app that lists the project's branches  
  ProjectsComponent - a page of the app that lists repos of an organization. The component allows to specify the organization and filter its repos by name or using language.  
  ProjectService - a service that allows the app to get repos and their branches from GitHub.
