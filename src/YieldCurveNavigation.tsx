import React, { Fragment,useMemo, FC } from 'react';
import { YcNavigationQueryResults,YcNavigationQueryRequest } from './services/YieldCurveService';
import usePromise from 'react-use-promise';


  

export const YcHandle: FC<YcNavigationQueryResults> = (qr) => {

    return (
        <React.Fragment>
            <ul>
                {qr.handles.map(handle => {
                    return (
                        <li>{handle.name}</li>
                    )
                })}

            </ul>
        </React.Fragment>

    );

};


