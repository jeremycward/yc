import React, {createContext} from 'react';
import './App.css';
import 'flexlayout-react/style/light.css';
import { YCServiceContext } from './services/YieldCurveService';

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

  

