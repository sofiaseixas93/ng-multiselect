import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-multiselect';
  data = [
    {
      id: 1,
      name: 'Sofia',
      group: 'CGI'
    },
    {
      id: 3,
      name: 'Nuno',
      group: 'Optimile'
    },
    {
      id: 2,
      name: 'Tiago',
      group: 'CGI'
    }
  ]
}
