import BootstrapTable from "react-bootstrap-table-next";

import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
const { SearchBar } = Search;

const columns = [
  {
    dataField: "id",
    text: "Product ID",
  },
  {
    dataField: "name",
    text: "Product Name",
  },
  {
    dataField: "price",
    text: "Product Price",
  },
];

const products = [
  {
    id: "1",
    name: "item name 0",
    price: 1000,
  },
  {
    id: "2",
    name: "item name 1",
    price: 1000,
  },
  {
    id: "3",
    name: "item name 2",
    price: 1000,
  },
];

const expandRow = {
  onlyOneExpanding: true,
  renderer: (row) => (
    <div>
      <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
      <p>
        You can render anything here, also you can add additional data on every
        row object
      </p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  ),
};

export default function App(params) {
  return (
    <div>
      <BootstrapTable
        keyField='id'
        data={products}
        columns={columns}
        expandRow={expandRow}
      />

      <ToolkitProvider keyField='id' data={products} columns={columns} search>
        {(props) => (
          <div>
            <h3>Input something at below input field:</h3>
            <SearchBar {...props.searchProps} />
            <hr />
            <BootstrapTable {...props.baseProps} />
          </div>
        )}
      </ToolkitProvider>

      <ToolkitProvider keyField='id' data={products} columns={columns} search>
        {(props) => (
          <div>
            <h3>Input something at below input field:</h3>
            <SearchBar {...props.searchProps} />
            <hr />
            <BootstrapTable {...props.baseProps} />
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
}
