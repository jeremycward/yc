import React, { useContext, useEffect, useState, FC } from 'react';
import { useRmi } from "../services/rmi"
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import { Chart } from './yieldcurve/samplegraph/Graph'
import { YcPointsPanel } from './yieldcurve/CurvePoints';
import { YCServiceContext, YcHandleProps, YieldCurve, YieldCurveService } from "../services/YieldCurveService"
import RGL, { WidthProvider } from "react-grid-layout";
import CalibrationForm from './CalibrationForm';
import { DashPanel } from '../layout/DashPanel';
import { YcGraph } from './yieldcurve/YcGraph';


const ReactGridLayout = WidthProvider(RGL);
const LoadingScreen: FC = () => {
  return <React.Fragment>

    <p>
      loading...
    </p>
  </React.Fragment>
}
export const ContentScreen: FC<YieldCurve> = (props: YieldCurve) => {
  var layout = [
    { i: "header", x: 0, y: 0, w: 12, h: 1, static: true },
    { i: "curvePoints", x: 0, y: 1, w: 5, h: 6, static: false, isResizable: true },
    { i: "calibration", x: 0, y: 6, w: 5, h: 5, static: false, isResizable: true },
    { i: "graph1", x: 5, y: 1, w: 7, h: 12, static: false, isResizable: true },


  ];
  const [key, setKey] = useState('home');
  return (
    <div style={{ background: 'darkgray' }}>

      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={50}
        isDraggable={true}
        isResizable={false}
      >

        <div key="header" style={{ background: 'darkgray', borderStyle: 'none', borderBottomStyle: 'solid' }}>
          <h3>Yeild Curve: {props.handle.name} ({props.handle.description})</h3>
        </div>
        <div key="curvePoints">
          <DashPanel title="Curve Points">
            <YcPointsPanel {...props}></YcPointsPanel>
          </DashPanel>
        </div>
        <div key="graph1">
          <DashPanel title="Graph 1">
            <YcGraph {...props}></YcGraph>
          </DashPanel>
        </div>
        <div key="calibration" >
          <DashPanel title="Calibration">
            <CalibrationForm {...props}></CalibrationForm>
          </DashPanel>

        </div>
      </ReactGridLayout>

    </div>

  )

}


export const YieldCurvePanel: FC<YcHandleProps> = (props: YcHandleProps) => {

  const yieldCurveService: YieldCurveService = useContext(YCServiceContext) as YieldCurveService
  const [yieldCurve, setYieldCurve] = useState<YieldCurve | null>(null)
  const [data, error, loading, fetchMethod] = useRmi(yieldCurveService.yieldCurveGetUnique, {})


  useEffect(() => {    
    if (data !== null) {
      const response: YieldCurve = data as YieldCurve      
      setYieldCurve(response);
    } else {
      setYieldCurve(null)
    }
  }, [data]);



  if (loading || yieldCurve===null) { return (<LoadingScreen />) } else {    
      return (<ContentScreen {...yieldCurve as YieldCurve}></ContentScreen >)
    }
}