import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    position: ''
  }

  isEditing: boolean = false;

  errorMessage = "";

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');

      if (id) {
        //editing current employee
        this.isEditing = true;

        this.employeeService.getEmployeeById(Number(id)).subscribe({
          next: (result) => this.employee = result,
          error: (err) =>   this.errorMessage = `Error Occured (${err.status})`
        })
      }
    })
  }

  onSubmit(): void {

    if (this.isEditing) {
      //logic to edit an employee
    this.employeeService.editEmployee(this.employee)
    .subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = `Error Occured During Update: (${err.status})`;
      }
    });
    } else {
      //logic to create another employee
    this.employeeService.createEmployee(this.employee)
    .subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = `Error Occured During Creation: (${err.status})`;
      }
    });
    }
  }

}
