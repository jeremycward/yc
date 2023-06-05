import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'

import React, { useContext, useEffect, useState, FC } from 'react';
import { YieldCurve } from '../services/YieldCurveService';

import Container from 'react-bootstrap/Container'



export const CalibrationForm: FC<YieldCurve> = (props: YieldCurve) => {
    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col>Volatillity</Col>
                    <Col>Value</Col>
                </Row>
                <Row>
                    <Col>Value Date</Col>
                    <Col>Value</Col>
                </Row>

            
            </Container>
        </React.Fragment>


    )

}

export default CalibrationForm;