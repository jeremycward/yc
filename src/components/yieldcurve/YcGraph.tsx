import React, { useContext, useEffect, useState, FC } from 'react';
import {
  AgCartesianSeriesTooltipRendererParams,
  AgChart,
  AgChartOptions,
  AgTooltipRendererResult,
  time,
} from 'ag-charts-community';
import { getData } from './samplegraph/data';
import { AgChartsReact } from 'ag-charts-react';
import { YieldCurve, Plot, MktData, Instrument,YcPoint } from '../../services/YieldCurveService';

const yieldCurvePlot = (plot: Plot): Array<any> => {
  return plot.x.map((dateElement, index) => {
    return {
      x: new Date(dateElement), y: plot.y[index]
    }
  })

}

const mktDataPlot = (mktData: MktData): Array<any>=>{

  const reducer = (acc:Array<any>,instr:Instrument,index:number,array:[]):Array<any>=>{
    const newPoints:Array<any> = instr.points.map((point:YcPoint)=>{return {x:point.maturityDate,y:point.value}})
    return [...acc,...newPoints]
  }

  return mktData.instruments.reduce(reducer,[])
}


const dateFormatter = new Intl.DateTimeFormat('en-US');
const tooltip = {
  renderer: ({
    title,
    xValue,
    yValue,
  }: AgCartesianSeriesTooltipRendererParams): AgTooltipRendererResult => ({
    title,
    content: `${dateFormatter.format(xValue)}: ${yValue}`,
  }),
};


const options = (yc: YieldCurve): AgChartOptions => {
  const curvePoints:Array<any> = mktDataPlot(yc.mktData)
  
  return {
    container: document.getElementById('myChart'),
    autoSize: true,

    theme: {
      overrides: {
        line: {
          legend: {
            position: 'bottom',
          },
          series: {
            highlightStyle: {
              series: {
                strokeWidth: 1,
                dimOpacity: 0.2,
              },
            },
          },
        },
      },
    },
    title: {
      text: 'YC interpolation',
      fontSize: 18,
      spacing: 25,
    },
    series: [
      {
        data: yieldCurvePlot(yc.plot),
        type: 'line',
        strokeWidth: 1,
        xKey: 'x',
        yKey: 'y',
        marker: {
          enabled: false
        }
      }
      // {
      //   data: curvePoints,
      //   type: 'line',
      //   strokeWidth: 1,
      //   stroke: 'blue',
      //   xKey: 'x',
      //   yKey: 'y',
      //   marker: {
      //     enabled: true
      //   }


      // }
    ],
    axes: [
      {
        position: 'bottom',
        type: 'time',
        tick: {
          interval: time.month.every(1),
        },
        title: {
          text: 'Tenor',
        },
        label: {
          autoRotate: true,
        },
      },
      {
        position: 'left',
        type: 'number',
        title: {
          text: 'Rate',
        },
        label: {
          autoRotate: true,
        },
      },
    ],
  }
};


export const YcGraph: FC<any> = (props: YieldCurve) => {
  return (
    <React.Fragment>
      <AgChartsReact options={options(props)}></AgChartsReact>

    </React.Fragment>
  )

}


const opts: AgChartOptions = {
  container: document.getElementById('myChart'),
  autoSize: true,
  series: [
    {
      data: [
        {
          time: new Date('01 Jan 2020 13:25:30 GMT'),
          sensor: 25,
        },
        {
          time: new Date('01 Jan 2020 13:26:30 GMT'),
          sensor: 24,
        },
        {
          time: new Date('01 Jan 2020 13:27:30 GMT'),
          sensor: 24,
        },
        {
          time: new Date('01 Jan 2020 13:28:30 GMT'),
          sensor: 23,
        },
        {
          time: new Date('01 Jan 2020 13:29:30 GMT'),
          sensor: 22.5,
        },
        {
          time: new Date('01 Jan 2020 13:30:30 GMT'),
          sensor: 21.5,
        },
        {
          time: new Date('01 Jan 2020 13:31:30 GMT'),
          sensor: 22.5,
        },
      ],
      xKey: 'time',
      yKey: 'sensor',
      yName: 'Lounge Temperature',
      stroke: '#03a9f4',
      marker: {
        fill: '#03a9f4',
        stroke: '#0276ab',
      },
    },
    {
      data: [
        {
          time: Date.parse('01 Jan 2020 13:25:00 GMT'),
          sensor: 21,
        },
        {
          time: Date.parse('01 Jan 2020 13:26:00 GMT'),
          sensor: 22,
        },
        {
          time: Date.parse('01 Jan 2020 13:28:00 GMT'),
          sensor: 22,
        },
        {
          time: Date.parse('01 Jan 2020 13:29:00 GMT'),
          sensor: 23,
        },
        {
          time: Date.parse('01 Jan 2020 13:30:00 GMT'),
          sensor: 24,
        },
        {
          time: Date.parse('01 Jan 2020 13:31:00 GMT'),
          sensor: 24,
        },
        {
          time: Date.parse('01 Jan 2020 13:32:00 GMT'),
          sensor: 24.5,
        },
        {
          time: Date.parse('01 Jan 2020 13:33:00 GMT'),
          sensor: 24.5,
        },
      ],
      xKey: 'time',
      yKey: 'sensor',
      yName: 'Office Temperature',
      stroke: '#8bc24a',
      marker: {
        fill: '#8bc24a',
        stroke: '#658d36',
      },
    },
  ],
  axes: [
    {
      type: 'time',
      position: 'bottom',
    },
    {
      type: 'number',
      position: 'left',
      label: {
        format: '#{.1f} °C',
      },
    },
  ],
  legend: {
    position: 'bottom',
  },
};