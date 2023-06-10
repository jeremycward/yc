import React, { useContext, useEffect, useState, FC } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

    faUser,
    faQuestionCircle,
    faArrowCircleLeft
} from "@fortawesome/free-solid-svg-icons";

export const Header: FC<any> = (props: any) => {
    const openCurly = '{'
    const closeCurly = '}'
    const paddingStyle ={width:'10px'}
    return (
        <React.Fragment>
            <div style={{ background: 'black', color: 'lightgray', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'lightgray', fontSize: '50px' }}>Dull</span>
                <span style={{ color: 'white', fontSize: '50px' }}>Bank</span>
                <span style={paddingStyle}></span>
                <span style={{ color: 'white', fontFamily: 'Courier New' }}>{`The bank with no ${openCurly}style${closeCurly}`}</span>
                <span style={{ flexGrow: '100' }}></span>


                <FontAwesomeIcon icon={faQuestionCircle} inverse />
                <span style={paddingStyle}></span>
                <FontAwesomeIcon icon={faUser} inverse />
                <span style={paddingStyle}></span>

            </div>
        </React.Fragment>


    )

}