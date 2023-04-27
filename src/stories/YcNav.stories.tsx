import type { Meta, StoryObj } from '@storybook/react';
import { ContentScreen } from '../components/YieldCurvePanel';
import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta:Meta<typeof ContentScreen> = {
  title: 'Yield Curve Panel',
  component: ContentScreen,  
  
} satisfies Meta<typeof ContentScreen>;

export default meta;
type Story = StoryObj<typeof ContentScreen>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const YieldCurveContent: Story = {
  args: {
    yieldCurveHandle: {
      name:"myName",description: "myDescription"
    },
    curvePoints: [
      {
        tenor:"6m",value: 5.6
      },
      {
        tenor:"12m",value: 6.6
      }

    ]
  },
};

