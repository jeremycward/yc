import React from 'react';
import './App.css';
import 'flexlayout-react/style/light.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { YCServiceContext } from './services/YieldCurveService';
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import Lapp from './layout/FlexLayout'

import { YieldCurveService } from './services/YieldCurveService'
import { YieldCurveServiceDefaultImpl } from './services/yieldcurveimpl/rest'
import { YieldCurveServiceDummyImpl } from './services/yieldcurveimpl/dummy'

const ycService: YieldCurveService = YieldCurveServiceDefaultImpl
export default function App() {
    return (
        <YCServiceContext.Provider value={ycService}>
            
            
            <div>
                <Lapp></Lapp>
            </div>

        </YCServiceContext.Provider>

    );
}


