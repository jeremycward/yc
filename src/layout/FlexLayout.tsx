import React, { createContext } from 'react';
import { Actions, Layout, Model, TabNode, IJsonModel, DockLocation } from 'flexlayout-react';
import { YcNavPanel } from '../components/YcNavPanel';
import { YieldCurvePanel } from '../components/YieldCurvePanel'
import { RfqMonitorPanel } from '../components/rfq/RfqMonitor';
import { RfqDetails } from '../components/rfq/RfqDetails';
import { RfqMessage } from '../services/YieldCurveService';

import 'flexlayout-react/style/dark.css';
import { YcHandleProps } from '../services/YieldCurveService';


import { Header } from '../components/Header';

export interface Mdi {
    addYeildCurve(handle: YcHandleProps): void;
    addRfqDetails(rfq: RfqMessage): void;
}

var tabComponentindexSeed: number = 1000
var monitorTabOpen: boolean = false

class MdiImpl implements Mdi {

    model: Model
    constructor(model: Model) {
        this.model = model;
    }
    addRfqDetails(rfq: RfqMessage): void {
        tabComponentindexSeed += 1
        this.model.doAction(Actions.addNode(
            { type: "tab", component: "RfqDetails", name: rfq.id, id: tabComponentindexSeed, config: { ...rfq } },
            this.model.getRoot().getChildren()[0].getId(), DockLocation.CENTER, 0));
    }
    addYeildCurve(handle: YcHandleProps): void {
        tabComponentindexSeed += 1
        this.model.doAction(Actions.addNode(
            { type: "tab", component: "yeildcurve", name: handle.name, id: tabComponentindexSeed, config: { ...handle } },
            this.model.getRoot().getChildren()[0].getId(), DockLocation.CENTER, 0));
    }
    showRfqMonitorTab(msg:RfqMessage): void {
        if (!monitorTabOpen) {
            tabComponentindexSeed += 1
            this.model.doAction(Actions.addNode(
                { type: "tab", component: "RfqMonitor", name: "RFQMonitor", id: tabComponentindexSeed, config: {} },
                this.model.getRoot().getChildren()[0].getId(), DockLocation.CENTER, 0));
            monitorTabOpen = true
        }


    }
}


var json: IJsonModel = {
    global: { "tabEnableFloat": true },
    borders: [{
        type: "border", location: "left", children: [
            {
                type: "tab", name: "RFQ Monitor", component: "RfqMonitor", enableClose: false
            },

            {
                type: "tab", name: "YieldCurves", component: "YcNavPanel", enableClose: false
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
const mdi: Mdi = new MdiImpl(model)
export const MdiContext = createContext<Mdi | null>(null)

export const factory = (node: TabNode) => {
    var component = node.getComponent();

    if (component === "YcNavPanel") {
        return <YcNavPanel></YcNavPanel>
    }
    if (component === "yeildcurve") {
        var config = node.getConfig();
        return <YieldCurvePanel {...config}></YieldCurvePanel>
    }
    if (component === "RfqDetails") {

        return <RfqDetails></RfqDetails>
    }
    if (component === "RfqMonitor") {
        var config = node.getConfig();
        return <RfqMonitorPanel></RfqMonitorPanel>
    }


    return (<React.Fragment>NoComponent</React.Fragment>)
}


export function LApp() {
    return (


        <MdiContext.Provider value={mdi}>

            <div>
                <Header></Header>

                <div
                    className="flex-container"
                    style={{
                        position: "relative",
                        height: "calc(90vh)" // TODO Manage size of flex layout properly
                    }}
                >


                    <Layout model={model} factory={factory} />
                </div>
            </div>



        </MdiContext.Provider>

    );
}

export default LApp;