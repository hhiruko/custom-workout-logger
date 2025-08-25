import { ChevronDown } from "lucide-preact";
import Chart from 'chart.js/auto';
import { useEffect, useState } from "preact/hooks";

export function Stats({collection}) {
    if(Object.keys(collection.list()).length === 0) {
        return;
    }

    const [list, setList] = useState(collection.list());

    useEffect(() => {
        const update = () => {
            setList(collection.list());
        };
        collection.subscribe(update);
        return () => {
            collection.unsubscribe(update);
        };
    }, [collection]);

    const handleStatsDropdown = (event) => {
        const statsContainer = document.querySelector('.stats-container');
        if (!statsContainer) {
            return;
        }

        const isOpen = statsContainer.style.display === 'block';
        statsContainer.style.display = isOpen ? 'none' : 'block';
        event.currentTarget.classList.toggle('opened', !isOpen);
    }

    const drawVolumeLineChart = () => {
        const result = Object.entries(list)
            .filter(([_, log]) => log.weight != null && log.time?.start != null && log.time?.end != null)
            .map(([key, log]) => {
                const repsSum = log.reps.flat(2).reduce((sum, rep) => sum + (rep ?? 0), 0);
                const duration = Math.floor((log.time.end - log.time.start) / 1000 / 60);
                return {
                    key,
                    value: (log.weight * repsSum) / duration
                };
            });

        const formatter = new Intl.DateTimeFormat(undefined, {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit"
        });

        const keys = result.map(entry => formatter.format(new Date(parseInt(entry.key))));
        const values = result.map(entry => entry.value);

        const ctx = document.getElementById("volume-line-chart-canvas");
        if (ctx.chart) {
            ctx.chart.destroy();
        }

        ctx.chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: keys,
                datasets: [
                    {
                        label: "Volume Density",
                        data: values
                    }
                ]
            }
        });
    };

    useEffect(() => {
        drawVolumeLineChart();
    }, [list]);

    return (
        <>
            <div className="stats-header">
                <h1>Analytics</h1>
                <button className="stats-dropdown-button" onClick={handleStatsDropdown}><ChevronDown /></button>
            </div>
            <div className="stats-container">
                <h2>Progressive Overload</h2>
                <canvas id="volume-line-chart-canvas"></canvas>
            </div>
            <hr/>
        </>
    );
}