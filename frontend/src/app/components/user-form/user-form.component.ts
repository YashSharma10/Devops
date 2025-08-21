import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="container">
      <h2>{{ isEditMode ? 'Edit User' : 'Create User' }}</h2>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" placeholder="Enter name">
          <mat-error *ngIf="userForm.get('name')?.errors?.['required']">
            Name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" placeholder="Enter email">
          <mat-error *ngIf="userForm.get('email')?.errors?.['required']">
            Email is required
          </mat-error>
          <mat-error *ngIf="userForm.get('email')?.errors?.['email']">
            Please enter a valid email address
          </mat-error>
        </mat-form-field>

        <div class="button-group">
          <button mat-raised-button color="primary" type="submit" [disabled]="!userForm.valid">
            {{ isEditMode ? 'Update' : 'Create' }}
          </button>
          <button mat-raised-button type="button" (click)="onCancel()">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 500px;
      margin: 0 auto;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .button-group {
      display: flex;
      gap: 10px;
    }
  `]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        this.loadUser();
      }
    });
  }

  loadUser(): void {
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe(user => {
        this.userForm.patchValue(user);
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      if (this.isEditMode && this.userId) {
        user.id = this.userId;
        this.userService.updateUser(user).subscribe(() => {
          this.router.navigate(['/users']);
        });
      } else {
        this.userService.createUser(user).subscribe(() => {
          this.router.navigate(['/users']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
