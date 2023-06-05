import type { Meta, StoryObj } from '@storybook/react';
import { ContentScreen } from '../components/YieldCurvePanel';
import { Button } from './Button';
import { dummyYieldCurve } from '../components/yieldcurve/samplegraph/data';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta:Meta<typeof ContentScreen> = {
  title: 'Yield Curve Panel',
  component: ContentScreen,  
  
} satisfies Meta<typeof ContentScreen>;


export default meta;
type Story = StoryObj<typeof ContentScreen>;
export const YieldCurveContent : Story = {args: {...dummyYieldCurve}}



// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const YieldCurveContent: Story = {
//   args: {
//     handle: {
//       name:"USD",description: "Fed Discount Curve (Sonia)"
//     },mktData: {
//       instruments:[
//         {name: "USD", points: [
//           {
//             tenor:"6m",value: 5.6
//           },
//           {
//             tenor:"12m",value: 6.6
//           },
//           {
//             tenor:"2y",value: 6.9
//           },
//           {
//             tenor:"5y",value: 6.9
//           },
//           {
//             tenor:"10y",value: 6.9
//           },
//           {
//             tenor:"20y",value: 6.9
//           },
//           {
//             tenor:"50y",value: 6.9
//           }
        
//         ]}
//       ]
//     }
//   },
// };

