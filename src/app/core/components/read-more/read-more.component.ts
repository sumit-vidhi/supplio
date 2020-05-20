import { Component, Input, ElementRef, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'read-more',
    template: `
        <div [innerHTML]="currentText">
        </div>
            <a  class="btn btn-transparent btn-orange btn-radius" (click)="detailPage();">Read more</a>
    `
})

export class ReadMoreComponent implements OnChanges {
    @Input() text: string;
    @Input() id: string;
    @Input() maxLength: number = 100;
    currentText: string;
    hideToggle: boolean = true;

    public isCollapsed: boolean = true;

    constructor(private elementRef: ElementRef, private router: Router) {

    }
    toggleView() {
        this.isCollapsed = !this.isCollapsed;
        this.determineView();
    }

    detailPage() {
        this.router.navigate(["/blog/blog-detail/" + this.id]);
    }
    determineView() {
        if (!this.text || this.text.length <= this.maxLength) {
            this.currentText = this.text;
            this.isCollapsed = false;
            this.hideToggle = true;
            return;
        }
        this.hideToggle = false;
        if (this.isCollapsed == true) {
            this.currentText = this.text.substring(0, this.maxLength) + "...";
        } else if (this.isCollapsed == false) {
            this.currentText = this.text;
        }

    }
    ngOnChanges() {
        this.determineView();
    }
}