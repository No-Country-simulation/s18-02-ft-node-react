'use client'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
export const description = 'A multiple line chart'
const chartData = [
  { month: 'January', first: 1, second: 2 },
  { month: 'February', first: 23, second: 12 },
  { month: 'March', first: 21, second: 31 },
  { month: 'April', first: 23, second: 2 },
  { month: 'May', first: 43, second: 22 },
  { month: 'June', first: 12, second: 40 },
  { month: 'July', first: 23, second: 12 },
  { month: 'August', first: 23, second: 10 },
  { month: 'September', first: 24, second: 14 },
  { month: 'October', first: 24, second: 14 },
  { month: 'November', first: 24, second: 14 },
  { month: 'December', first: 32, second: 60 }
]

const chartConfig = {
  first: {
    label: '2023',
    color: 'var(--chart-1)'
  },
  second: {
    label: '2024',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig

export default function ClassChart () {
  return (
    <Card>
      <CardHeader>
        <CardTitle>225 Clases</CardTitle>
        <CardDescription>2023 - 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="first"
              type="monotone"
              stroke="var(--color-first)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="second"
              type="monotone"
              stroke="var(--color-second)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
