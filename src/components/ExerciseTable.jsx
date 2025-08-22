import { useCallback, useState } from "preact/hooks";
import { debounce } from "../helpers/Debounce";

export function ExerciseTable({collection, exerciseKey, readonly}) {
    const emptyLog = Array.from({ length: 5 }, () => Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => null)));
    const [log, setLog] = useState(collection.get(exerciseKey) ?? [...emptyLog]);

    const exercises = [
        ["Skull crushers", "Straight legged deadlifts"],
        ["Upright rows", "Split squats"],
        ["Dumbbell curls", "Front squats"],
        ["Pullovers", "Flyes"],
        ["Push-ups", "Dumbbell rows"],
    ];

    const saveLog = useCallback(
        debounce((superset, exercise, set, rep) => {
            let newLog = !log ? [...emptyLog] : [...log];
            newLog[superset][exercise][set] = parseInt(rep);
            collection.set(exerciseKey, newLog);
            setLog(newLog);
        }, 200),
        []
    );

    return (
        <>
            <h1>{exerciseKey}</h1>
            <table className="exercise-table">
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