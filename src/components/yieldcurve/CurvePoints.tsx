import { YcPoint, YCServiceContext, YcHandleProps, YieldCurve, YieldCurveService,flattenMarketData, MarketDataRecord} from "../../services/YieldCurveService"
import { AgGridReact } from 'ag-grid-react';
import React, { useContext, useEffect, useState, FC } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
export const YcPointsPanel: FC<YieldCurve> = (props: YieldCurve) => {

  const columnDefs = [
    { field: 'name' },
    { field: 'ycPoint.tenor' },
    { field: 'ycPoint.value' },
  ]

 const marketDataRecords: Array<MarketDataRecord> = flattenMarketData(props.mktData)
  return (
    <div style={{ height: '100%', width: '100%', background: 'black' }}>
      <div className="ag-theme-balham" style={{ height: '100%', width: '100%', background: 'blue' }}>
        <AgGridReact
          rowData={marketDataRecords}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </div>
  );


}