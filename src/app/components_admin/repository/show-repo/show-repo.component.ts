import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { ReposService } from '../../../services/adminServices/repos.service';

@Component({
  selector: 'app-show-repo',
  templateUrl: './show-repo.component.html',
  styleUrls: ['./show-repo.component.css']
})
export class ShowRepoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Date', 'Project_Title', 'Project_Leader', 'Funding_Source', 'Budget', 'Options'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ModalTitle: string | undefined;
  ActivateAddEditRepoComp: boolean = false;
  repo: any;

  constructor(private service: ReposService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.refreshRepoList();
  }

  ngAfterViewInit(): void {
    // Apply paginator and sort to dataSource once the view is initialized
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addClick(): void {
    this.repo = {
      id: 0,
      Date: '',
      Project_Title: '',
      Project_Leader: '',
      Funding_Source: '',
      Budget: ''
    };
    this.ModalTitle = 'Add Repository';
    this.ActivateAddEditRepoComp = true;
  }

  editClick(item: any): void {
    console.log(item);
    this.repo = item;
    this.ModalTitle = 'Edit Repository';
    this.ActivateAddEditRepoComp = true;
    console.log(item);
  }

  deleteClick(item: any): void {
    if (confirm('Are you sure you want to delete this repository?')) {
      this.service.deleteRepository(item.id).subscribe(() => {
        this.toastr.error('Deleted Successfully', 'Deleted');
        this.refreshRepoList();
      });
    }
  }

  closeClick(): void {
    this.ActivateAddEditRepoComp = false;
    this.refreshRepoList();
  }

  refreshRepoList(): void {
    this.service.getRepoList().subscribe((data) => {
      this.dataSource.data = data.sort((a, b) => b.id - a.id); // Sort descending by ID

      // Ensure paginator and sort are updated after data is assigned to dataSource
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
