import { Rmi } from "../services/rmi"
import {PubSub} from "../services/pubsub"
import { createContext } from 'react';

import { dummyYieldCurve } from "../components/yieldcurve/samplegraph/data";

export interface Plot {
    x: Array<string>
    y: Array<Number>
}
export interface YcPoint {
    tenor: String
    value: number
    maturityDate:String
}

export interface Instrument{
    name: String
    points: Array<YcPoint>
}


export interface MktData{
    instruments: Array<Instrument>
}
export interface YcHandleProps {
    name: String    
    description:   String
}


export interface YcNavigationQueryResults {
    handles: Array<YcHandleProps>
}
export interface YcNavigationQueryRequest {

}
export interface YieldCurve {
    handle: YcHandleProps    
    mktData: MktData
    plot: Plot

}
export interface RfqMessage{
    id: String    
    status : String    
}

export interface YieldCurveService {
    yieldCurveList: Rmi<YcNavigationQueryRequest, YcNavigationQueryResults>;
    yieldCurveGetUnique: Rmi<YcHandleProps, YieldCurve>;
    rfqMonitor: PubSub<RfqMessage>
}


function submit(rmiRequest: YcNavigationQueryRequest): Promise<YcNavigationQueryResults> {

    return new Promise<YcNavigationQueryResults>((resolve, reject) => {
        setTimeout(() => {
            resolve({
                handles: [
                    { name: "jeremy", description: "ward" },
                    { name: "sheila", description: "hanly" }
                ]
            })
        }, 500)
    }
    )
}
export interface MarketDataRecord{
    name: String,
    ycPoint: YcPoint

}


export const flattenMarketData = (mkdData:MktData):Array<MarketDataRecord>=>{
    const retVal: Array<MarketDataRecord> = []
    mkdData.instruments.forEach((thisInstr:Instrument)=>{
        thisInstr.points.forEach((thisPoint:YcPoint)=>{
            retVal.push({name:thisInstr.name, ycPoint: thisPoint})
        })
    })
    return retVal    

}


export const YCServiceContext = createContext<YieldCurveService | null>(null)
