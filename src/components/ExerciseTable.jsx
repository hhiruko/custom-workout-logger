import { useCallback, useState } from "preact/hooks";
import { debounce } from "../helpers/Debounce";
import { exercises } from "../helpers/Exercise";

export function ExerciseTable({collection, exerciseKey, readonly}) {
    const emptyLog = {
        weight: null,
        reps: Array.from({ length: 5 }, () => Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => null)))
    }
    const [log, setLog] = useState(collection.get(exerciseKey) ?? structuredClone(emptyLog));

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
        }, 500),
        [exerciseKey, collection]
    );

    const dateTimeOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    return (
        <>
            <div className="exercise-header-container">
                <h2>{new Intl.DateTimeFormat(undefined, dateTimeOptions).format(new Date(parseInt(exerciseKey)))}</h2>
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