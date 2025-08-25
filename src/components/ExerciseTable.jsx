import { useCallback, useState } from "preact/hooks";
import { debounce } from "../helpers/Debounce";
import { exercises } from "../helpers/Exercise";
import { Timer, TimerOff } from "lucide-preact";

export function ExerciseTable({collection, exerciseKey, readonly}) {
    const emptyLog = {
        weight: null,
        time: {
            start: null,
            end: null
        },
        reps: Array.from({ length: 5 }, () => Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => null)))
    }
    const [log, setLog] = useState(collection.get(exerciseKey) ?? structuredClone(emptyLog));

    const dateTimeOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const saveLog = useCallback(
        debounce((superset, exercise, set, rep) => {
            setLog(prev => {
                let newLog = !prev ? structuredClone(emptyLog) : structuredClone(prev);
                newLog.reps[superset][exercise][set] = parseInt(rep);
                collection.set(exerciseKey, newLog);
                return newLog;
            });
        }, 200),
        [exerciseKey, collection]
    );

    const saveWeight = useCallback(
        debounce((weight) => {
            setLog(prev => {
                let newLog = !prev ? structuredClone(emptyLog) : structuredClone(prev);
                newLog.weight = parseFloat(weight);
                collection.set(exerciseKey, newLog);
                return newLog;
            });
        }, 1000),
        [exerciseKey, collection]
    );

    const saveStartTime = useCallback(
        () => {
            setLog(prev => {
                let newLog = !prev ? structuredClone(emptyLog) : structuredClone(prev);
                newLog.time.start = Date.now();
                collection.set(exerciseKey, newLog);
                return newLog;
            })
        },
        [exerciseKey, collection]
    );

    const saveEndTime = useCallback(
        () => {
            setLog(prev => {
                let newLog = !prev ? structuredClone(emptyLog) : structuredClone(prev);
                newLog.time.end = Date.now();
                collection.set(exerciseKey, newLog);
                return newLog;
            })
        },
        [exerciseKey, collection]
    );

    return (
        <>
            <div className="exercise-header-container">
                <h2>{new Intl.DateTimeFormat(undefined, dateTimeOptions).format(new Date(parseInt(exerciseKey)))}</h2>
                <div className="exercise-time-container">
                    {readonly ? 
                        (log['time']['start'] ?? false) && (log['time']['end'] ?? false) ? 
                            Math.floor((log['time']['end'] - log['time']['start']) / 1000 / 60) + ' min'
                            : null 
                        : (
                        <>
                            <button disabled={log['time']['start'] ?? false} onClick={saveStartTime}><Timer /></button>
                            <button disabled={log['time']['end'] ?? false} onClick={saveEndTime}><TimerOff /></button>
                        </>
                    )}
                </div>
                <div className="exercise-weight-container">
                    {readonly ? (
                        <p>{log['weight']}</p>
                    ) : (
                        <input 
                            className="exercise-weight-input" 
                            type="number" 
                            onChange={(event) => saveWeight(event.target.value)} 
                            value={log['weight']}
                        />
                        
                    )}
                    <p>kg</p>
                </div>
            </div>
            <table className="exercise-table">
                <tbody>
                    {exercises().map((superset, s) => (
                        <>
                            {superset.map((exercise, e) => (
                                <tr>
                                    <td colSpan={2}>{exercise}</td>
                                    {[0, 1].map(set => (
                                        <td>{readonly ? log['reps'][s][e][set] : (
                                            <input 
                                                className="exercise-table-input" 
                                                type="number" 
                                                onChange={(event) => saveLog(s, e, set, event.target.value)} 
                                                value={log['reps'][s][e][set]}
                                            />
                                        )}</td>
                                    ))}
                                </tr>
                            ))}
                        </>
                    ))}
                </tbody>
            </table>
        </>
    );
}