import { Rmi } from "../../services/rmi"
import { YcNavigationQueryRequest,YcNavigationQueryResults,YcHandleProps,YieldCurve,YieldCurveService } from "../YieldCurveService";
import { dummyYieldCurve } from "../../components/yieldcurve/samplegraph/data";
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

export const YieldCurveServiceDummyImpl: YieldCurveService = {
    yieldCurveList: yieldCurveListImpl,
    yieldCurveGetUnique: yieldCurveGetUniqueImpl
}
