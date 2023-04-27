import React, { useContext, useEffect, useState, FC } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useRmi } from "../services/rmi"
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';

import { YcPointsPanel } from './yieldcurve/CurvePoints';
import { YcPoint, YCServiceContext, YcHandleProps, YieldCurve, YieldCurveService } from "../services/YieldCurveService"
var ReactGridLayout = require("react-grid-layout");

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
    { i: "curvePoints", x: 0, y: 1, w: 6, h: 6, static: false },
    { i: "graph",       x: 6, y: 6, w: 6, h: 3, static: false }
    
  ];
  const [key, setKey] = useState('home');
  return (
    <React.Fragment>
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
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
        <div key="graph">
          <Card >
            <Card.Header>Graph</Card.Header>
            <Card.Body>
              <div style={{background: 'yellow',width: "100%",height: "100%"}}>
                <h1>graph</h1>
              </div>
            </Card.Body>
          </Card>
        </div>


      </ReactGridLayout>
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