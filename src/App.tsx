import React from 'react';
import './App.css';
import 'flexlayout-react/style/light.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { YCServiceContext } from './services/YieldCurveService';
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import Lapp from './layout/FlexLayout'

import {YieldCurveService,YieldCurveServiceDefaultImpl} from './services/YieldCurveService'
const ycService : YieldCurveService = YieldCurveServiceDefaultImpl


export default function App() {
    return (
        <YCServiceContext.Provider value={ycService}>
            <Lapp></Lapp>

        </YCServiceContext.Provider>
        
    );
}

  

