
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

import { GridApi, GridReadyEvent } from 'ag-grid-community'
import React, { useContext, useEffect, useState, FC, useMemo } from 'react';
import { YieldCurveService } from '../../services/YieldCurveService';
import { YCServiceContext } from '../../services/YieldCurveService';
import { MdiContext,Mdi } from '../../layout/FlexLayout';
import { RfqMessage } from '../../services/YieldCurveService';



export const RfqMonitorPanel: FC<any> = (props: any) => {

  const columnDefs = [
    { field: 'id' },
    { field: 'status' },
  ]

  const [rfqRecords, setRfqRecords] = useState<Array<RfqMessage>>([])
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [subscribed, setSubscribed] = useState<boolean>(false)
  const [gridReady, setGridReady] = useState<boolean>(false)
  const yieldCurveService: YieldCurveService = useContext(YCServiceContext) as YieldCurveService
  const mdi: Mdi = useContext(MdiContext) as Mdi

  function onSelectionChanged() {
    const selectedRows:any = gridApi?.getSelectedRows();
    if (selectedRows.length==1 ){
     const  msg: RfqMessage = selectedRows[0] as RfqMessage
     mdi.addRfqDetails(msg)
    }

  }

  const onGridReady: any = (e: any) => {
    setGridApi(e.api)
    setGridReady(true)
  }

  useEffect(() => {
    if (!subscribed && gridReady) {
      setSubscribed(true)
      yieldCurveService.rfqMonitor.subscribe((msg: RfqMessage) => {
        var rowNode = undefined
        rowNode = gridApi?.getRowNode(msg.id as string)
        if (!rowNode) {
          gridApi?.applyTransaction({
            add: [{ ...msg }]
          });
        } else {
          gridApi?.applyTransaction({
            update: [{ ...msg }]
          });


        }


      }

      )
    }
  })

  const idGenerator: any = (msg: any) => {
    console.log(msg.data.id)
    return msg.data.id
  }
  return (
    <div style={{ height: '100%', width: '100%', background: 'black' }}>
      <div className="ag-theme-balham-dark" style={{ height: '100%', width: '100%', background: 'black' }}>
        <div style={{ height: '100%' }}>
          <AgGridReact
            getRowId={idGenerator}
            domLayout='autoHeight'
            rowData={rfqRecords}
            rowSelection ="single"
            onSelectionChanged={onSelectionChanged}
            columnDefs={columnDefs}
            onGridReady={onGridReady}>
          </AgGridReact>
        </div>
      </div>
    </div>
  );


}