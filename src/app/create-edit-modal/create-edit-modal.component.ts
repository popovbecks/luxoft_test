import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit-modal',
  templateUrl: './create-edit-modal.component.html',
  styleUrls: ['./create-edit-modal.component.scss']
})
export class CreateEditModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: User},
   private fb: FormBuilder,
   public dialogRef: MatDialogRef<CreateEditModalComponent>) {}
  userForm!: FormGroup;
  private id: number = 0;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });

   this.initForm();
  }

  private initForm () {
    if (this.data.user) {
      const { id, name, address, email, username } = this.data.user;
      this.userForm.setValue({id, name, address, email, username});
    } else {
      this.userForm.reset();
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onClose () {
    this.dialogRef.close();
  }
}
