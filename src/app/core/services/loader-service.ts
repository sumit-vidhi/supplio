import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loading: boolean = false;
  private _blog: boolean = false;
  loadingStatus: Subject<any> = new Subject();
  blogData: Subject<any> = new Subject();

  get loading(): boolean {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  get blog(): boolean {
    return this._blog;
  }

  set blog(value) {
    this._blog = value;
    this.blogData.next(value);
  }

  addblog(data) {
    this.blog = data;
  }
}