
import React, { useContext, useEffect, useState, FC } from 'react';
import { useRmi } from "../services/rmi"
import { YCServiceContext, YieldCurveService, YcNavigationQueryResults, YcHandleProps } from "../services/YieldCurveService"
import { MdiContext,Mdi } from '../layout/FlexLayout';


const YcHandlePanel : FC<YcHandleProps> =(props:YcHandleProps)=>{
    const mdi: Mdi = useContext(MdiContext) as Mdi
    const openCurve:Function = () =>{
    }
    return (
        <div>
           <a onClick={()=>mdi.addYeildCurve(props)}>{props.name}</a> - {props.description}
        </div>
    )
}
export const YcNavPanel: FC<any> = () => {

    const yieldCurveService: YieldCurveService = useContext(YCServiceContext) as YieldCurveService
    
    const [ycData, setYcData] = useState<Array<YcHandleProps>>([])
    const [data, error, loading, fetchMethod] = useRmi(yieldCurveService.yieldCurveList, {})

    useEffect(() => {
        if (data) {
            const response: YcNavigationQueryResults = data as YcNavigationQueryResults
            setYcData(response.handles);
            console.log(data);
        } else {
            setYcData([])  

        }
    }, [data]);

    useEffect(() => {
        if (loading) {
            console.log("retrieving yc handles...");
        }
    }, [loading]);

    return (
        <div>
            <h4>Yield Curves</h4>
            {loading && <p>loading...</p>}
            <ul className="list-group">
                {ycData &&
                    ycData.map((ycHandle, index) => (
                        <li key={index} >
                          <YcHandlePanel {...ycHandle}></YcHandlePanel>                          
                            
                        </li>
                    ))}
            </ul>
        </div>

    )
}