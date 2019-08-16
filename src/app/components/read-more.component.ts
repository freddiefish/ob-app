import {Component} from '@angular/core';

@Component({
  selector: 'app-read-more',
  template: `
        <div [class.truncate]="isCollapsed">
            <ng-content></ng-content>
            <div (click)="isCollapsed = !isCollapsed">
              <i class="material-icons read-more-direction">{{isCollapsed ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}}</i>
            </div>
        </div>
    `,
  styles: [`
    .truncate {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .read-more-direction {
      cursor: pointer;
    }
  `]
})

export class ReadMoreComponent {
  isCollapsed = true;
}
