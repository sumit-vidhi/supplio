import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from "../../services/loader-service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoaderService) { }

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
