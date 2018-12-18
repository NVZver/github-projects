import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(url) {
    return browser.get(url);
  }

  getElementByClass(className: string) {
    return element(by.css(className));
  }
}
