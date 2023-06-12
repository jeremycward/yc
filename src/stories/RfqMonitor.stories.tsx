import type { Meta, StoryObj } from '@storybook/react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

import React from 'react';
import { RfqMonitorPanel } from '../components/rfq/RfqMonitor';
import { YieldCurveServiceDummyImpl } from '../services/yieldcurveimpl/dummy'
import { YieldCurveService, YCServiceContext } from '../services/YieldCurveService';


const meta: Meta<typeof RfqMonitorPanel> = {
  title: 'RfqMonitorPanel',
  component: RfqMonitorPanel,

} satisfies Meta<typeof RfqMonitorPanel>;

export default meta;
type Story = StoryObj<typeof RfqMonitorPanel>;

const ycService: YieldCurveService = YieldCurveServiceDummyImpl


export const EmptyMonitor: Story = {

  render: () => {
    return (
      <YCServiceContext.Provider value={ycService}>
        <RfqMonitorPanel></RfqMonitorPanel>
      </YCServiceContext.Provider>
    )

  }
}

