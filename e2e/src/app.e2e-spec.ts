import { AppPage } from './app.po';
import { browser, ExpectedConditions, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display a search field for organizations', () => {
    page.navigateTo('/');
    const searchField = page.getElementByClass('projects__organization');
    expect(searchField).toBeTruthy();
  });

  it('should find projects and dispaly then as a list', () => {
    page.navigateTo('/projects?owner=payworks');
    const projectsContent = page.getElementByClass('projects__content');
    expect(projectsContent).toBeTruthy();

    const projectListItems = page.getElementByClass('projects-list');
    expect(projectListItems).toBeTruthy();
  });
});
