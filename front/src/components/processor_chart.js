import { LineChart } from '@mui/x-charts/LineChart';

export default function Processor_chart({ cpuData }) {

    // const cpuDataLimited = cpuData.slice(-20);
    const max = 30;
    const total = cpuData.length;

    let shownData = cpuData;
    let xData = cpuData.map((_, i) => i + 1);

    if (total > max) {
        const start = total - max;
        
        shownData = cpuData.slice(start);
        // xData = shownData.map((_, i) => start + i + 1);
        xData = shownData.map((_, i) => i);
    }

    console.log("Shown Data:", shownData, "X Data:", xData);

    
    return (

        <div>
            <LineChart skipAnimation
                // xAxis={[{ data: xData }]}
                xAxis={[{ data: xData }]}

                series={[
                    {
                        data: shownData,
                    },
                ]}
                height={300}
            />
        </div>
    )
}