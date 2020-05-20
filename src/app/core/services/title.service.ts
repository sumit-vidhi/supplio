
/**
* Creates a new TitleService.
* @class TitleService
* @description
* This is title service, responsible for changing the application title.
* We need to attach title related information in the route file. It will
* automatically get from there
* Reference Links
* https://toddmotto.com/dynamic-page-titles-angular-2-router-events
* https://stackoverflow.com/questions/34597835/how-to-get-current-route
*/

import { merge } from 'rxjs';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { appSettings } from '@configs/app-settings.config';


const APP_TITLE = appSettings.appTitle;
const SEPARATOR = ' | ';

@Injectable()
export class TitleService {

  /**
   * @function ucFirst
   * @param {string} String to convert
   * @description
   * Uppercase the first character from given string
   * @example
   * ucFirst('appTitle')
   * @returns string
   */
  static ucFirst(string) {
    if (!string) {
      return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metaTitle: Title,
  ) { }

  /**
   * @function init
   * @param {string} String to convert
   * @description
   * Change the application title on route navigation
   */
  init() {
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    // Change page title on navigation or language change, based on route data
    merge(onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        const title = event['title'];
        if (title) {
          this.metaTitle.setTitle(`${title} ${SEPARATOR} ${APP_TITLE}`);
        } else {
          this.metaTitle.setTitle(`${title}`);
        }
      });
  }

}

