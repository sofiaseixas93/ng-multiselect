import { Component, OnInit, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiselectComponent),
    multi: true,
  }]
})
export class MultiselectComponent implements OnInit, ControlValueAccessor {

  @Input() items = new Array<any>();
  @Input() bindLabel = "label";
  @Input() groupLabel = "group";
  @Input() disabled = false;
  @Input() enableSearch = true;

  selectable: Array<any> = new Array();
  selected: Array<any> = new Array();

  selectableWithSearch: Array<any> = new Array();
  selectedWithSearch: Array<any> = new Array();

  selectableSearch: string;
  selectedSearch: string;

  groups: Array<string> = new Array();

  constructor() { }

  ngOnInit() {
    //copy items array and sort it
    this.selectable = this.items.map(item => Object.assign({}, item));
    this.selectable = this.sortItems(this.selectable);

    //populate group array and sort it
    this.items.forEach((item) => {
      if (!this.groups.includes(item[this.groupLabel])) {
        this.groups.push(item[this.groupLabel]);
      }
    });
    this.groups = this.sortGroups(this.groups);
    this.onSelectableSearch();
    this.onSelectedSearch();
  }

  writeValue(obj: any): void {
    this.selected = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange = () => { };

  onTouched = () => { };

  select(index: number) {
    if (!this.disabled) {
      const item = this.selectable.splice(index, 1)[0];
      this.selected.push(item);
      this.selected = this.sortItems(this.selected);
      this.onSelectableSearch();
      this.onSelectedSearch();
    }
  }

  unselect(index: number) {
    if (!this.disabled) {
      const item = this.selected.splice(index, 1)[0];
      this.selectable.push(item);
      this.selectable = this.sortItems(this.selectable);
      this.onSelectableSearch();
      this.onSelectedSearch();
    }
  }

  selectGroup(group: string) {
    if (!this.disabled) {
      let newSelectable = new Array<any>();
      this.selectable.forEach((value) => {
        if (value[this.groupLabel] == group) {
          this.selected.push(value);
        } else {
          newSelectable.push(value);
        }
      });
      this.selected = this.sortItems(this.selected);
      this.selectable = newSelectable;
      this.onSelectableSearch();
      this.onSelectedSearch();
    }
  }

  unselectGroup(group: string) {
    if (!this.disabled) {
      let newSelected = new Array<any>();
      this.selected.forEach((value) => {
        if (value[this.groupLabel] == group) {
          this.selectable.push(value);
        } else {
          newSelected.push(value);
        }
      });
      this.selectable = this.sortItems(this.selectable);
      this.selected = newSelected;
      this.onSelectableSearch();
      this.onSelectedSearch();
    }
  }

  hasAnySelected(group: string) {
    if (this.selectedWithSearch == null) {
      return false;
    }
    return this.selectedWithSearch.find((element) => { return element[this.groupLabel] == group; }) != undefined;
  }

  hasAnySelectable(group: string) {
    if (this.selectableWithSearch == null) {
      return false;
    }
    return this.selectableWithSearch.find((element) => { return element[this.groupLabel] == group; }) != undefined;
  }

  onSelectableSearch() {
    if (this.selectableSearch == null || this.selectableSearch == "") {
      this.selectableWithSearch = this.selectable;
    } else {
      this.selectableWithSearch = this.selectable.filter((value) => {
        return value[this.bindLabel].toUpperCase().includes(this.selectableSearch.toUpperCase()) 
        || value[this.groupLabel].toUpperCase().includes(this.selectableSearch.toUpperCase());
      });
    }
  }

  onSelectedSearch() {
    if (this.selectedSearch == null || this.selectedSearch == "") {
      this.selectedWithSearch = this.selected;
    } else {
      this.selectedWithSearch = this.selected.filter((value) => {
        return value[this.bindLabel].toUpperCase().includes(this.selectedSearch.toUpperCase()) 
        || value[this.groupLabel].toUpperCase().includes(this.selectedSearch.toUpperCase());
      });
    }
  }

  private sortGroups(groups: Array<string>) {
    return groups.sort((group1, group2) => {
      if (group1 > group2) {
        return 1;
      } else if (group1 < group2) {
        return -1;
      } else {
        return 0;
      }
    })
  }

  private sortItems(items: Array<any>) {
    return items.sort((item1, item2) => {
      if (item1[this.bindLabel] > item2[this.bindLabel]) {
        return 1;
      } else if (item1[this.bindLabel] < item2[this.bindLabel]) {
        return -1;
      } else {
        return 0;
      }
    });
  }

}
