import type { Meta, StoryObj } from '@storybook/react';
import { ContentScreen } from '../components/YieldCurvePanel';
import { Button } from './Button';
import { FC } from 'react';
import  React from 'react';
import {DashPanel} from '../../src/layout/DashPanel'
import  {dummyYieldCurve} from '../../src/components/yieldcurve/samplegraph/data'

const DashPanelExample : FC<any> = (props:any)=>{
  return(
    <DashPanel title="title of card">
      <h5>content</h5>
      <p>more content</p>
    </DashPanel>
  )

}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta:Meta<typeof ContentScreen> = {
  title: 'DashPanelWrapper',
  component: DashPanelExample,  
  
} satisfies Meta<typeof DashPanelExample>;

export default meta;
type Story = StoryObj<typeof DashPanelExample>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DashWrapperStory: Story = {
  args: {
    ...dummyYieldCurve
  }
};

