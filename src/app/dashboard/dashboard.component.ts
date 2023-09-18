import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { Subject, map, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditModalComponent } from '../create-edit-modal/create-edit-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private readonly userService = inject(UserService);
  private readonly dialog = inject(MatDialog);
  private destroy$ = new Subject();

  public users: User[] = [];

  public updateUserList(user: User): void {
    const index = this.users.findIndex(userItem => userItem.id === user.id);
    this.users[index] = user;
  }

  public deleteUser(id: number): void {
    this.users = this.users.filter(userItem => userItem.id !== id);
  }

  public createUser(user: User) {
    const userId = this.users[this.users.length - 1].id || 1;
    this.users.push(
      {
        ...user,
        id: userId + 1
      }
    )
  }

  public openUpdateModal(user: User | null = null) {
    const dialogRef = this.dialog.open(CreateEditModalComponent, {
      data: {
        user: user,
      },
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=> {
      if (data) {
        if (data.id) {
          this.updateUserList(data);
        } else {
          this.createUser(data);
        }
      }
    })
  }

  openDeleteModal(userId: any) {
    this.deleteUser(userId);
  }


  ngOnInit(): void {
    this.userService.getUsers()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(users => this.users = users)
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
}
