import axios from "axios";
import { Rmi } from "../../services/rmi"
import { PubSub,MessageHandler } from "../pubsub";
import { RfqMessage } from "../YieldCurveService";
import { YcNavigationQueryRequest,YcNavigationQueryResults,YcHandleProps,YieldCurve,YieldCurveService } from "../YieldCurveService";


function fetchYcHandlesAxios() {
    return axios.get("http://localhost:5000/ycHandles", { method: 'GET' })
}
function fetchYieldCurveUniqueAxios(ycName: String) {
    return axios.get("http://localhost:5000/yc", { method: 'GET', params: { ycName: ycName } })

}


const yieldCurveListRestImpl: Rmi<YcNavigationQueryRequest, YcNavigationQueryResults> = (request: YcNavigationQueryRequest): Promise<YcNavigationQueryResults> => {
    return fetchYcHandlesAxios().then(
        (result) => {
            console.log(result.data)
            const parsed: YcNavigationQueryResults = result.data as YcNavigationQueryResults
            return Promise.resolve(parsed)
        }
    ).catch((error) => {
        console.log(error)
        alert(error)
        return Promise.resolve({
            handles: []
        })
    });
}
const yieldCurveGetUniqeRestImpl: Rmi<YcHandleProps, YieldCurve> = (request: YcNavigationQueryRequest): Promise<YieldCurve> => {
    return fetchYieldCurveUniqueAxios('EUR-OUTRIGHT').then(
        (result) => {           
            const parsed: YieldCurve = result.data as YieldCurve
            return Promise.resolve(parsed)
        }
    ).catch((error) => {
        return Promise.resolve(null as any)
    });
}


class rfqPubSubImpl implements PubSub<RfqMessage> {
    intervalId: any
    handler : MessageHandler<RfqMessage> | null
    sendMessage(){
        
        console.log("sending message")

    }
    subscribe(handler: MessageHandler<RfqMessage>): void {
        this.intervalId =  setInterval(this.sendMessage,1000)
    }
    

    unsubscribe(): void {
        clearInterval(this.intervalId)

    } 
}

export const YieldCurveServiceDefaultImpl: YieldCurveService = {
    yieldCurveList: yieldCurveListRestImpl,
    yieldCurveGetUnique: yieldCurveGetUniqeRestImpl,
    rfqMonitor: new rfqPubSubImpl()
}

