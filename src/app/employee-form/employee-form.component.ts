import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    position: ''
  }

  constructor(private employeeService: EmployeeService) {}

  onSubmit(): void {
    console.log(this.employee);

    //logic to create another employee
    this.employeeService.createEmployee(this.employee)
      .subscribe((result) => {
      console.log(result);
    })
  }

}
