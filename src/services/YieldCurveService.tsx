import { Rmi } from "../services/rmi"
import { createContext } from 'react';
import axios from "axios";
export interface YcPoint {
    tenor: String
    value: number
}

export interface YcHandleProps {
    name: String
    description: String
}


export interface YcNavigationQueryResults {
    handles: Array<YcHandleProps>
}
export interface YcNavigationQueryRequest {

}
export interface YieldCurve {
    yieldCurveHandle: YcHandleProps
    curvePoints: Array<YcPoint> 
}

export interface YieldCurveService {
    yieldCurveList: Rmi<YcNavigationQueryRequest, YcNavigationQueryResults>;
    yieldCurveGetUnique: Rmi<YcHandleProps, YieldCurve>
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

const yieldCurveListImpl: Rmi<YcNavigationQueryRequest, YcNavigationQueryResults> =
    (request: YcNavigationQueryRequest): Promise<YcNavigationQueryResults> => {
        return new Promise<YcNavigationQueryResults>((resolve, reject) => {
            setTimeout(() => {
                const results: YcNavigationQueryResults = {
                    handles: [
                        { name: "jeremy", description: "ward" },
                        { name: "sheila", description: "hanly" }
                    ]


                }
                resolve(results)                
            }, 500)
        }
        )
    }


 function fetchYcHandlesAxios() {    
    return axios.get("http://localhost:5000/ycHandles", {method: 'GET'})
}
function fetchYieldCurveUniqueAxios(ycName:String){
    return axios.get("http://localhost:5000/yc", {method: 'GET', params: {ycName: ycName}})

}

const yieldCurveListRestImpl: Rmi<YcNavigationQueryRequest, YcNavigationQueryResults> = (request: YcNavigationQueryRequest): Promise<YcNavigationQueryResults> => {
    return fetchYcHandlesAxios().then(        
        (result)=>{            
            console.log(result.data)
            const parsed: YcNavigationQueryResults = result.data as YcNavigationQueryResults
            return Promise.resolve(parsed)
        }
    ).catch((error)=>{
        console.log(error)
        alert(error)
        return Promise.resolve({ handles: []
        })
    });
}
const yieldCurveGetUniqeRestImpl: Rmi<YcHandleProps, YieldCurve> = (request: YcNavigationQueryRequest): Promise<YieldCurve> => {
    return fetchYieldCurveUniqueAxios('EUR-OUTRIGHT').then(        
        (result)=>{            
            console.log(result.data)
            const parsed: YieldCurve = result.data as YieldCurve
            return Promise.resolve(parsed)
        }
    ).catch((error)=>{
        return Promise.resolve(null as any)
    });

}


const yieldCurveGetUniqueImpl: Rmi<YcHandleProps, YieldCurve> = (request: YcHandleProps): Promise<YieldCurve> => {
    return new Promise<YieldCurve>((resolve, reject) => {
        setTimeout(() => {
            resolve({
                yieldCurveHandle: request,
                curvePoints : [
                    {tenor: "6M",value: 3.4}                 
                ]
            })
        }, 200)
    }
    )


}

export const YieldCurveServiceDefaultImpl: YieldCurveService = {
    yieldCurveList: yieldCurveListRestImpl,
    yieldCurveGetUnique: yieldCurveGetUniqeRestImpl
}


export const YCServiceContext = createContext<YieldCurveService | null>(null)
