import React, { useContext, useEffect, useState, FC } from 'react';
import { useRmi } from "../services/rmi"
import Card from 'react-bootstrap/Card';
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'

import { YcPointsPanel } from './yieldcurve/CurvePoints';
import { YCServiceContext, YcHandleProps, YieldCurve, YieldCurveService } from "../services/YieldCurveService"
import RGL, { WidthProvider } from "react-grid-layout";


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

    { i: "curvePoints", x: 0, y: 1, w: 6, h: 4, static: false },
    { i: "graph1",       x: 6, y: 1, w: 6, h: 4, static: false,isResizable:true },

    { i: "graph2",       x: 0, y: 2, w: 6, h: 4, static: false,isResizable:true },
    { i: "graph3",       x: 6, y: 2, w: 6, h: 4, static: false }
    
  ];
  const [key, setKey] = useState('home');
  return (
    <React.Fragment>
      <div style={{borderStyle:'solid', borderWidth: 2, borderBlockColor: 'black'}}>
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={50}
        width={1200}
        isDraggable={true}
        isResizable={true}
      >


        <div key="header" style={{background: 'red'}}>
          <h1>{props.yieldCurveHandle.name}</h1>
        </div>


        <div key="curvePoints">
          <Card >
            <Card.Header>Yield Curve Points</Card.Header>
            <Card.Body>
              <YcPointsPanel {...props}></YcPointsPanel>
            </Card.Body>
          </Card>
        </div>
        <div key="graph1">
          <Card >
            <Card.Header>Graph1</Card.Header>
            <Card.Body>
              <div style={{background: 'yellow',width: "100%",height: "100%"}}>
                <h1>graph</h1>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div key="graph2">
          <Card >
            <Card.Header>Graph2</Card.Header>
            <Card.Body>
              <div style={{background: 'red',width: "100%",height: "100%"}}>
                <h1>graph</h1>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div key="graph3" style={{background:'blue'}}>
          <span >
            <h1>graph3</h1>
          </span>
        </div>




      </ReactGridLayout>
      </div>
    </React.Fragment>

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
      console.log(data);
    } else {
      setYieldCurve(null)

    }
  }, [data]);


  return (
    loading ? <LoadingScreen /> : <ContentScreen {...yieldCurve as YieldCurve}></ContentScreen>

  )
}