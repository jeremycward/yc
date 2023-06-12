import { Rmi } from "../../services/rmi"
import { YcNavigationQueryRequest,YcNavigationQueryResults,YcHandleProps,YieldCurve,YieldCurveService, RfqMessage } from "../YieldCurveService";
import { dummyYieldCurve } from "../../components/yieldcurve/samplegraph/data";
import { PubSub } from "../pubsub";
import { MessageHandler } from "../pubsub";
const max: number=53456
const min: number=655944
const rfqLen = 15
const ids:Array<Number> =Array.from({length: rfqLen}, () => Math.floor(Math.random() * (max-min) + min))
const statusList:String[] = ['new','priced','streaming','rejected','accepted']



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


const yieldCurveGetUniqueImpl: Rmi<YcHandleProps, YieldCurve> = (request: YcHandleProps): Promise<YieldCurve> => {
    return new Promise<YieldCurve>((resolve, reject) => {
        setTimeout(() => {
            const yc: YieldCurve = dummyYieldCurve as YieldCurve            
            resolve(yc)
        }, 500)
    }
    )
}
function nextRandomMessage(){
    const nexIndex:any = Math.floor(Math.random() * rfqLen)
    const nextStatus:any = Math.floor(Math.random() * statusList.length)
    return {
        id:  ids[nexIndex].toString(),
        status: statusList[nextStatus]
    }
}

class rfqPubSubImpl implements PubSub<RfqMessage> {
    intervalId: any | null
    
    subscribe(handler: MessageHandler<RfqMessage>): void {        
        if (this.intervalId!==null){
            this.intervalId =  
            setInterval(()=>handler(nextRandomMessage()),500)
        }
    }
    

    unsubscribe(): void { 
        this.intervalId = null       
        clearInterval(this.intervalId)
        
    } 
}
    
    

export const YieldCurveServiceDummyImpl: YieldCurveService = {
    yieldCurveList: yieldCurveListImpl,
    yieldCurveGetUnique: yieldCurveGetUniqueImpl,
    rfqMonitor: new rfqPubSubImpl()
}
