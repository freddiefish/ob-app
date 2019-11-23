import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NotifyDialogComponent } from './components/notify-dialog/notify-dialog.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private dialog: MatDialog,
    private router: Router
    ) {}

  ngOnInit() {
    this.notifyLocationUse();
   }

  notifyLocationUse() {
    if (!localStorage.getItem('notifiedLocationUse')) {
      this.showDialogLocationUse();
    } else {
      this.router.navigate(['/home']);
    }
  }

  showDialogLocationUse() {
    const dialogNotifyLocUse = this.dialog.open(NotifyDialogComponent , {
      height: '220px',
      width: '300px',
    });

    dialogNotifyLocUse.afterClosed()
    .subscribe(result => {
      console.log('Dialog result: ', result);
      if (result) {
        localStorage.setItem('notifiedLocationUse', 'true');
        this.router.navigate(['/home']);
      }
    });
  }

}
