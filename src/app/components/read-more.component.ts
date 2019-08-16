import {Component, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-read-more',
  template: `
    <div class="read-more-ellipsis" #readMoreEllipsis [hidden]="!isCollapsed"
         [ellipsis]="'&nbsp;more...'" (ellipsis-click-more)="handleMoreClicked($event)"
         [ellipsis-content]="content">

    </div>
    <div class="read-more-full" [hidden]="isCollapsed" #readMoreFull [innerHTML]="content"></div>
    `,
  styles: [`
    .read-more-ellipsis {
      height: 100px;
      width: 100%;
    }
  `],
})

export class ReadMoreComponent {
  isCollapsed = true;
  private _content = '';
  @Input() set content(content: string) {
    this._content = content;
    // make sure we're displaying the ellipsis read more
    this.isCollapsed = true;
  }
  get content() {
    return this._content;
  }

  @ViewChild('readMoreEllipsis', {static: true}) readMoreEllipsis: any;
  @ViewChild('readMoreFull', {static: true}) readMoreFull: any;

  handleMoreClicked($event) {
    this.isCollapsed = false;
  }
}
