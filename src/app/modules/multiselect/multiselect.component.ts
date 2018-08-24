import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {

  @Input("items") items: any[];
  @Input("bindLabel") bindLabel: string;

  constructor() { }

  ngOnInit() {
  }

}
