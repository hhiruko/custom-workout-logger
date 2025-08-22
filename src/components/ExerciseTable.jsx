import { useCallback, useState } from "preact/hooks";
import { debounce } from "../helpers/Debounce";

export function ExerciseTable({storage, key, readonly}) {
    const emptyLog = Array.from({ length: 5 }, () => Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => null)));
    const [log, setLog] = useState(storage.get(key) ?? [...emptyLog]);

    const exercises = [
        ["Skull crushers", "Straight legged deadlifts"],
        ["Upright rows", "Split squats"],
        ["Dumbbell curls", "Front squats"],
        ["Pullovers", "Flyes"],
        ["Push-ups", "Dumbbell rows"],
    ];

    const saveLog = useCallback(
        debounce((superset, exercise, set, rep) => {
            let newLog;
            if(!log) {
                newLog = [...emptyLog];
            } else {
                newLog = [...log];
            }

            newLog[superset][exercise][set] = parseInt(rep);
            
            storage.set(key, newLog);
            setLog(newLog);
        }, 200),
        []
    );

    return (
        <>
            <table className="exercise-table">
                <thead></thead>
                <tbody>
                    {exercises.map((superset, s) => (
                        <>
                            {superset.map((exercise, e) => (
                                <tr>
                                    <td colSpan={2}>{exercise}</td>
                                    {[0, 1].map(set => (
                                        <td>{readonly ? log[s][e][set] : (
                                            <input 
                                                className="exercise-table-input" 
                                                type="number" 
                                                onChange={(event) => saveLog(s, e, set, event.target.value)} 
                                                value={log[s][e][set]}
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