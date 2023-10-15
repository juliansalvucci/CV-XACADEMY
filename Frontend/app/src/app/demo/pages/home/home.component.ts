import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private userService: UserService) {}

  displayedColumns: string[] = ['id', 'name'];

  dataSource = new MatTableDataSource<any>([]);

  ngOnInit(): void {
    this.loadAllResumes();
  }

  private loadAllResumes() {
    this.userService.findAllResumes().subscribe((res) => {
      this.dataSource = new MatTableDataSource<any>(res);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }
}
