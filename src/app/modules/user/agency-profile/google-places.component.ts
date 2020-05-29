import {
  Component,
  ViewChild,
  EventEmitter,
  Output,
  OnInit,
  AfterViewInit,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {} from 'googlemaps';

@Component({
  selector: 'AutocompleteComponent',
  template: `
    <input
      class="input form-control"
      type="text"
      [(ngModel)]="autocompleteInput"
      (mouseover)="demo()"
      (mouseout)="demo22()"
      #addresstext
      style=""
    />
  `,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext', { static: false }) addresstext: any;
  @Input() address: string;
  autocompleteInput: string;
  queryWait: boolean;

  constructor() {}
  demo() {
    if (this.autocompleteInput == '') {
      this.invokeEvent({});
    }
  }
  demo22() {
    if (this.autocompleteInput == '') {
      this.invokeEvent({});
    }
  }

  ngOnInit() {
    if (this.address) {
      this.autocompleteInput = this.address;
    }
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        //  componentRestrictions: { country: 'US' },
        types: [this.adressType], // 'establishment' / 'address' / 'geocode'
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }
}
