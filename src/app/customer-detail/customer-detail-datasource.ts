import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Database } from '../_models/database';


// TODO: Replace this with your own data model type
export interface CustomerDetailItem {
    institutionName: string;
    instanceName: string;
    wsInstance: string;
    database: Database;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: CustomerDetailItem[] = [
  // data format to initialize example data
  // {institutionName : "", instanceName : "", wsInstance : "", database : {prodDatabase : true, databaseServer : "", databaseName : "", databaseType : "" }}
  {institutionName : "CollegeNET, inc. Sales", instanceName : "implement", wsInstance : "impl", database : {prodDatabase : true, databaseServer : "prod3", databaseName : "implement", databaseType : "series25" }},
  {institutionName : "Partners", instanceName : "partners", wsInstance : "part", database : {prodDatabase : true, databaseServer : "prod3", databaseName : "partners", databaseType : "series25" }},
  {institutionName : "UniData QA Instance", instanceName : "qaunidata", wsInstance : "", database : {prodDatabase : false, databaseServer : "prod5", databaseName : "qaunidata_lynx", databaseType : "lynx" }},
  {institutionName : "Workday QA Instance", instanceName : "qawd", wsInstance : "", database : {prodDatabase : false, databaseServer : "prod3", databaseName : "qawd_lynx", databaseType : "lynx" }}
];

/**
 * Data source for the CustomerDetail view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CustomerDetailDataSource extends DataSource<CustomerDetailItem> {
  data: CustomerDetailItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<CustomerDetailItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: CustomerDetailItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: CustomerDetailItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'institutionName': return compare(a.institutionName, b.institutionName, isAsc);
        case 'database': return compare(+a.database, +b.database, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
