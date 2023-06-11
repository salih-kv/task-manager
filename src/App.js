import "./App.css";
import {useState} from "react";

function App() { // state for task
    const [tasks, setTasks] = useState([]);
    // state for task value
    const [inputValue, setInputValue] = useState("");

    // Add Task
    function addData() {
        if (inputValue.length === 0) {
            return;
        }
        setTasks([
            ...tasks, {
                content: inputValue,
                isComplete: false,
                idEditing: false
            },
        ]);
        setInputValue("");
    }

    // Delete Task
    function deleteTask(taskIndex) {
        tasks.splice(taskIndex, 1);
        setTasks([...tasks]);
    }

    function markCompleted(taskIndex) {
        tasks[taskIndex].isComplete = !tasks[taskIndex].isComplete;
        setTasks([...tasks]);
    }

    function editTask(taskIndex) {
        tasks[taskIndex].isEditing = true;
        setTasks([...tasks]);
    }

    function updateValue(taskIndex, value) {
        tasks[taskIndex].content = value;
        setTasks([...tasks]);
    }

    function saveTask(taskIndex) {
        tasks[taskIndex].isEditing = false;
        setTasks([...tasks]);
    }

    function displayCount() {
        if (tasks.length > 0) {
            return <p className="task-count">{`total tasks: ${tasks.length}`}</p>
        }
    }

    return (
        <div className="container">
            <h1 className="title">Task Manager</h1>
            <div className="input-cont">
                <input value={inputValue}
                    onChange={
                        (e) => setInputValue(e.target.value)
                    }
                    type="text"/>
                <button onClick={addData}
                    className="submit-btn">
                    Submit
                </button>
            </div>
            <div> {
                displayCount()
            } </div>
            <div className="list-cont">
                {
                tasks.sort((a) => (a.isComplete ? 1 : -1)).map((task, index) => {
                    return (
                        <div key={index}
                            className="task-item">
                            <div>
                                <input type="checkbox"
                                    checked={
                                        task.isComplete
                                    }
                                    onChange={
                                        () => markCompleted(index)
                                    }/>{" "}
                                {
                                task.isEditing ? (
                                    <span>
                                        <input type="text"
                                            value={
                                                task.content
                                            }
                                            onChange={
                                                (e) => updateValue(index, e.target.value)
                                            }/>
                                        <button onClick={
                                            () => saveTask(index)
                                        }>
                                            <i class="fa-solid fa-check"></i>
                                        </button>
                                    </span>
                                ) : (
                                    <span> {
                                        task.isComplete ? (
                                            <del>{
                                                task.content
                                            }</del>
                                        ) : (task.content)
                                    }
                                        {" "} </span>
                                )
                            } </div>
                            <div>
                                <button onClick={
                                        () => editTask(index)
                                    }
                                    className="delete-btn">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button onClick={
                                        () => deleteTask(index)
                                    }
                                    className="delete-btn">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    );
                })
            }
                {" "} </div>
        </div>
    );
}

export default App;
