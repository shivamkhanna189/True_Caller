/**
 *
 ** AgGridManager is the base class that involves all basic utilities for ag-grid community edition
 *
 * For more complex functionality, inherit this class and use your own custom functions.
 *
 *
 * How to use:
 *
 * 1. Initialize AgGridManger :
 * @example:
 *
 * *var agGridManager = new AgGridManager(gridOptions,rowData,columnDefinitions);
 *
 * 2. On Grid Ready:
 *
 ** Core functionality of the AgGridManager depends upon gridApi. Need to set this value when grid is ready
 */

import {
    GridOptions,
    ColDef,
    GridApi,
    IDatasource,
    IGetRowsParams,
    ColumnApi,
  } from "ag-grid-community";
import { InjectorInstance } from "src/app/app.module";
import { ApiService } from "src/app/core/service/api.service";
  
  export class AgGridManager {
    public gridOptions: GridOptions;
  
    /**
     * *ColumnDefinitons
     */
    public columnDefs: ColDef[];
  
    /**
     * *Row Data
     */
    public rowData: any[];
  
    /**
     * * Grid Api is used for all  functionalities in ag-grid
     */
    private gridApi: GridApi;
  
    /**
     * *Grid Column Api
     */
    private gridColumnApi: ColumnApi;
  
    /**
     * api url
     */
    private apiUrl: string;
  
    /**
     * *Loading Template
     */
    readonly LOADING_TEMPLATE = `<img src="assets/layouts/images/loading-spinner-blue.gif">`;
  
    /**
     * *No Data Template
     */
    readonly NO_DATA =
      '<div class="null-table"><span><i class="fa fa-search"></i></span><p>No matching records found</p></div>';
  
    /**
     * @courtesy: https://stackoverflow.com/questions/49507928/how-to-inject-httpclient-in-static-method-or-custom-class
     * *Used to inject httClientService
     */
    httpClient = InjectorInstance.get<ApiService>(ApiService);
  
    dataSource: IDatasource = {
      getRows: (params: IGetRowsParams) => {
        let pageSize = this.gridOptions.paginationPageSize;
        let pageNumber = params.endRow / this.gridOptions.paginationPageSize;
        this.showLoader();
        this.getData(
          pageNumber,
          pageSize,
          params.filterModel,
          params.sortModel
        ).subscribe(
          data => {
            params.successCallback(data.results, data.count);
            if (data.count == 0) {
              this.gridApi.showNoRowsOverlay();
            } else {
              this.hideLoader();
            }
          },
          error => {
            this.hideLoader();
          }
        );
      }
    };
  
    getData(pageNumber, pageSize, filter, sort) {
      let query = "";
      for (var key in filter) {
        query += key + "=" + filter[key].filter + "&";
      }
  
      sort.forEach(sortModel => {
        if (sortModel.sort == "asc") {
          query += "ordering=" + sortModel.colId;
        } else if (sortModel.sort == "desc") {
          query += "ordering=" + "-" + sortModel.colId;
        }
      });
  
      return this.httpClient.get(`${this.apiUrl}/?page=${pageNumber}&page_size=${pageSize} `);
    }
    constructor(
      gridOptions: GridOptions,
      rowData: any[],
      columnDefs: any[],
      apiUrl?: string
    ) {
      this.gridOptions = gridOptions;
      this.rowData = rowData;
      this.columnDefs = columnDefs;
      this.apiUrl = apiUrl;
      this.setLoaderTemplate();
      this.setNoRowTemplate();
    }
  
    getdataSource() {
      this.gridApi.setDatasource(this.dataSource);
    }

    /**
     * *Grid Api is used to use functionalities that are available in ag-grid
     * @param gridApi
     */
    public setGridApi(params): void {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.getdataSource();
    }
    /**
     * * To automatically resize the column to fit the whole width
     */
    public sizeColumnsToFit(): void {
      this.gridApi.sizeColumnsToFit();
    }
    /**
     * *Show loader
     */
    public showLoader(): void {
      this.gridApi.showLoadingOverlay();
    }
  
    /**
     * *Hide Loader
     */
    public hideLoader(): void {
      this.gridApi.hideOverlay();
    }
  
    /**
     * *Set Loader template if not present
     */
    private setLoaderTemplate(): void {
      let isLoaderTemplatePresentInGridOptions: boolean =
        "overlayLoadingTemplate" in this.gridOptions;
  
      if (!isLoaderTemplatePresentInGridOptions) {
        this.gridOptions.overlayLoadingTemplate = this.LOADING_TEMPLATE;
      }
    }
  
    /**
     * *Set No rows template if not present
     */
    private setNoRowTemplate(): void {
      let isNoDataTemplatePresentInGridOptions: boolean =
        "overlayNoRowsTemplate" in this.gridOptions;
  
      if (!isNoDataTemplatePresentInGridOptions) {
        this.gridOptions.overlayNoRowsTemplate = this.NO_DATA;
      }
    }
  }
  