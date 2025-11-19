import { LineChart } from '@mui/x-charts/LineChart';

export default function Ram_chart({ ramData }) {

    // const cpuDataLimited = cpuData.slice(-20);
    // const max = 30;
    // const total = cpuData.length;

    // let shownData = cpuData;
    // let xData = cpuData.map((_, i) => i + 1);

    // if (total > max) {
    //     const start = total - max;
        
    //     shownData = cpuData.slice(start);
    //     // xData = shownData.map((_, i) => start + i + 1);
    //     xData = shownData.map((_, i) => i);
    // }

    const usage = Math.round((ramData.ram / ramData.totalRam *100),2)


    
    return (

        <div>
            {/* {usage} */}
            <LineChart skipAnimation
                // xAxis={[{ data: xData }]}
                xAxis={[{ data: [1] }]}

                series={[
                    {
                        data: [usage,100,0],
                    },
                ]}
                height={300}
            />
        </div>
    )
}