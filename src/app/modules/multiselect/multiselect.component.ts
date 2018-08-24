import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {

  @Input("items") items: Array<any>;
  @Input("bindLabel") bindLabel: string;

  selectable: Array<any> = new Array();
  selected: Array<any> = new Array();

  constructor() { }

  ngOnInit() {
    //copy items array and sort it
    this.selectable = this.items.map(item => Object.assign({}, item)).sort((item1, item2) => {
      if (item1[this.bindLabel] > item2[this.bindLabel]) {
        return 1;
      } else if (item1[this.bindLabel] < item2[this.bindLabel]) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  select(index: number) {
    const item = this.selectable.splice(index, 1);
    this.selected.push(item);
    console.log(this.selectable);
    console.log(this.selected);
  }

  unselect(index: number) {
    const item = this.selected.splice(index, 1);
    this.selectable.push(item);
    console.log(this.selectable);
    console.log(this.selected);
  }

}
