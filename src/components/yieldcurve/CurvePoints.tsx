import { YcPoint, YCServiceContext, YcHandleProps, YieldCurve, YieldCurveService } from "../../services/YieldCurveService"
import { AgGridReact } from 'ag-grid-react';
import React, { useContext, useEffect, useState, FC } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
export const YcPointsPanel: FC<YieldCurve> = (props: YieldCurve) => {

  // const [rowData] = useState([
  //   
  // ]);



  // const rowData = [
  //   { tenor: "Toyota", value: 3.4448},

  // ]

  

  const columnDefs = [
    { field: 'tenor' },
    { field: 'value' },
  ]
  

  return (
    <div className="ag-theme-alpine" style={{ height: 120, width: 120 }}>
      <AgGridReact
        rowData={props.curvePoints}
        columnDefs={columnDefs}>
      </AgGridReact>
    </div>
  );


}