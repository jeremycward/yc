import React,{createContext} from 'react';
import  { Actions,Action, Layout, Model, TabNode, IJsonModel,DockLocation } from 'flexlayout-react';
import { YcNavPanel } from '../components/YcNavPanel';
import {YieldCurvePanel} from '../components/YieldCurvePanel'

import 'flexlayout-react/style/light.css';
import { YcHandleProps } from '../services/YieldCurveService';
import { YcHandle } from '../YieldCurveNavigation';


export interface Mdi {
    addYeildCurve(handle:YcHandleProps):void;
}

var tabComponentindexSeed:number =1000

class  MdiImpl implements Mdi{
    model:Model
    constructor(model:Model){
        this.model = model;
    }
    addYeildCurve(handle:YcHandleProps):void{        
        tabComponentindexSeed +=1
        this.model.doAction(Actions.addNode(
            {type:"tab", component:"yeildcurve", name:handle.name, id: tabComponentindexSeed,config:{...handle} },
            this.model.getRoot().getChildren()[0].getId(), DockLocation.CENTER, 0));
    }
}


var json: IJsonModel = {
    global: { "tabEnableFloat": true },
    borders: [{
        type:"border",location:"left",children: [
            {
                type:"tab",name:"Rates Term Structures",component:"button",enableClose:false
             },

             {
                type:"tab",name:"YieldCurves",component:"YcNavPanel",enableClose:false
             },
             {
                type:"tab",name:"Mkt Data",component:"button", enableClose:false
             }


        ]    
    }],
    layout: {
        type: "row",
        children: [

            {
                type: "row",
                weight: 100,
                children: [
                    {
                        type: "tabset",
                        weight: 50,
                        children: []
                    }

                ]
            }]
    }
};

export const model = Model.fromJson(json);
const mdi:Mdi = new MdiImpl(model)
export const MdiContext= createContext<Mdi | null>(null)

export const factory = (node: TabNode) => {
    var component = node.getComponent();
    
    if (component === "button") {        
        return <button>{node.getName()}</button>;
    }
    if (component ==="YcNavPanel"){
        return <YcNavPanel></YcNavPanel>
    }
    if (component ==="yeildcurve"){
        var config = node.getConfig();        
        return <YieldCurvePanel {...config}></YieldCurvePanel>
    }

    return (<React.Fragment>NoComponent</React.Fragment>)
}


export function LApp() {
    return (
        <MdiContext.Provider value={mdi}>
        <Layout
            model={model}
            factory={factory} />
        </MdiContext.Provider>
    );
}

export default LApp;