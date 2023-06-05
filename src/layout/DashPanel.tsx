import Card from 'react-bootstrap/Card';
import React, { useContext, useEffect, useState, FC } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const DashPanel: FC<any> = (props: any) => {
    return (
        <React.Fragment>
        <div style={{width:'100%', height: '100%', display: 'flex', flexDirection: 'column'}}>            
                  <div style={{flexGrow: 0, background: 'lightgray'}}>{props.title}</div> 
                  <div style={{flexGrow: 5}}>{props.children}</div>
                  
        </div>
        </React.Fragment>
    )

}



