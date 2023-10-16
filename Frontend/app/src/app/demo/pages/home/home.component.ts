import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user/user.service';
import { environment as ENV } from 'src/app/enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { DataresumecontainerService } from 'src/app/services/dataresumecontainer/dataresumecontainer.service';
import { IResume } from 'src/app/interfaces/IResume';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private dataresumecontainerService: DataresumecontainerService,
    public _MatPaginatorIntl: MatPaginatorIntl
  ) {}

  displayedColumns: string[] = ['id', 'name', 'acciones'];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this._MatPaginatorIntl.itemsPerPageLabel = 'items por página';
    this.loadAllResumes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  configTable() {
    this.dataSource.sort = this.sort!;
    this.dataSource.paginator = this.paginator!;
  }

  async loadAllResumes() {
    this.userService.findAllResumes().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.configTable();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  deleteResume(resumeId: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este curriculum?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete<number>(`${ENV.apiUrl}/resume/${resumeId}`)
          .subscribe(async () => {
            Swal.fire(
              '¡Eliminado!',
              'El curriculum ha sido eliminado.',
              'success'
            );
            this.loadAllResumes();
            console.log('data', this.dataSource.data);
          });
      }
    });
  }

  editResume(resumeId: number) {
    this.http
      .get<IResume>(`${ENV.apiUrl}/resume/${resumeId}`)
      .subscribe((res) => {
        this.dataresumecontainerService.resumeEdit = res;
        this.router.navigateByUrl('/app/resumes');
      });
  }
}
