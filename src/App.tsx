import * as React from 'react';
import { Fragment } from 'react';

// import Adaptable Component and other types
import AdaptableReact, {
  AdaptableOptions
} from '@adaptabletools/adaptable-react-aggrid';

import { AdaptableToolPanelAgGridComponent } from '@adaptabletools/adaptable/src/AdaptableComponents';

// import agGrid Component
import { AgGridReact } from '@ag-grid-community/react';

// import adaptable css and themes
import '@adaptabletools/adaptable-react-aggrid/base.css';
import '@adaptabletools/adaptable-react-aggrid/themes/light.css';
import '@adaptabletools/adaptable-react-aggrid/themes/dark.css';

// import aggrid themes (using new Alpine theme)
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css';

import {
  AllEnterpriseModules
} from '@ag-grid-enterprise/all-modules';

// create ag-Grid Column Definitions
const columnDefs = () => [
  {
    headerName: 'Auto Make',
    field: 'make',
    editable: true,
    filter: true,
    sortable: true,
    type: 'abColDefString',
  },
  {
    headerName: 'Model',
    field: 'model',
    editable: true,
    filter: true,
    sortable: true,
    type: 'abColDefString',
  },
  {
    headerName: 'Price',
    field: 'price',
    editable: true,
    filter: true,
    sortable: true,
    type: 'abColDefNumber',
  },
  {
    headerName: 'Date manufactured',
    field: 'date',
    type: 'abColDefDate',
    filter: true,
    floatingFilter: true,
  },
];
// some dummy data
const rowData = [
  { id: 1, make: 'Toyota', model: 'Celica', price: 35000, date: '2010-01-02' },
  { id: 2, make: 'Ford', model: 'Mondeo', price: 32000, date: '2012-01-02' },
  { id: 3, make: 'Ford', model: 'Fiesta', price: 22000, date: '2014-01-02' },
  { id: 4, make: 'Porsche', model: 'Boxter', price: 72000, date: '2016-01-02' },
  { id: 5, make: 'Ford', model: 'Galaxy', price: 14900, date: '2010-08-08' },
  {
    id: 6,
    make: 'Porsche',
    model: 'Mission',
    price: 53500,
    date: '2014-07-02',
  },
  {
    id: 7,
    make: 'Mitsubishi',
    model: 'Outlander',
    price: 4500,
    date: '2018-05-02',
  },
  { id: 8, make: 'Toyota', model: 'Yaris', price: 30000, date: '2017-03-02' },
  { id: 9, make: 'Ford', model: 'Mondeo', price: 46000, date: '2019-01-02' },
  {
    id: 10,
    make: 'Toyota',
    model: 'Corolla',
    price: 31000,
    date: '2016-08-04',
  },
];

// let ag-grid know which columns and what data to use and add some other properties
const gridOptions =  () => ({
  defaultColDef: {
    enablePivot: true,
    enableRowGroup: true,
    enableValue: true,
  },
  columnDefs: columnDefs(),
  rowData: rowData,
  components: {
    AdaptableToolPanel: AdaptableToolPanelAgGridComponent,
  },
  sideBar: true,
  suppressMenuHide: true,
  enableRangeSelection: true,
  enableCharts: true,
});

// build the AdaptableOptions object
// in this example we are NOT passing in predefined config but in the real world you will ship the AdapTable with objects and permissions
const adaptableOptions = (): AdaptableOptions => ({
  primaryKey: 'id',
  userName: 'sandbox user',
  licenseKey: process.env.REACT_APP_ADAPTABLE_LICENSE_KEY,
  adaptableId: 'adaptable react demo',
  dashboardOptions: {
    customToolbars: [],
  },
  predefinedConfig: {
    Dashboard: {
      Tabs: [
        {
          Name: 'Welcome',
          Toolbars: ['GithubRepo', 'CustomSettingsPanel', 'CustomQuickSearch'],
        },
      ],
    },
    ToolPanel: {
      Revision: Date.now(),
    },
  },
  plugins: [],
});

const modules = [...AllEnterpriseModules];

const App: React.FC = () => {
  const [show, setShow] = React.useState<boolean>(true);

  const gOptions = gridOptions();
  return (
    <div style={{ display: 'flex', flexFlow: 'column', height: '100vh' }}>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setShow(true)}>
          Show
        </button>
        <button onClick={() => setShow(false)}>
          Hide
        </button>
      </div>
      {show && <Fragment>
      <AdaptableReact
        style={{ flex: 'none' }}
        gridOptions={gOptions}
        adaptableOptions={adaptableOptions()}
        modules={modules}
      />
      <div className="ag-theme-alpine" style={{ flex: 1 }}>
        <AgGridReact gridOptions={gOptions} modules={modules} />
      </div>
      </Fragment>
    }
    </div>
  );
};

export default App;
