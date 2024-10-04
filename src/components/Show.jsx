import {React,useState} from 'react'


const Show = (props) => {
    const { tasks, settasks } = props;
    const [undodelete, setundodelete] = useState({ task: null, index: null });
    const [showUndo, setShowUndo] = useState(false);

    const rendertasks = tasks.length > 0 ? (
        tasks.map((task, index) => (
            <li key={index} className="mb-5 flex justify-between items-center border rounded-xl p-5">
                <div className="flex items-center">
                    <div
                        onClick={(e) => completeHandler(e, index)}
                        className={`${task.completed ? "bg-green-600 border-none" : "border border-orange-600"} mr-4 rounded-full w-[30px] h-[30px] `}
                    ></div>
                    <h1 className={`${task.completed ? "line-through" : ""} text-2xl font-extrabold text-yellow-100`}>
                        {task.title}
                    </h1>
                </div>
                <div className="flex gap-3 text-2xl text-yellow-100">
                    <i className="ri-file-edit-line"></i>
                    <i onClick={(e) => deleteHandler(e, index)} className="ri-delete-bin-3-line"></i>
                </div>
            </li>
        ))
    ) : (
        <h1 className="text-yellow-100 text-2xl text-center font-bold mt-10">No Tasks Yet</h1>
    );

    const completeHandler = (e, index) => {
        const copytasks = [...tasks];
        copytasks[index].completed = !copytasks[index].completed;
        settasks(copytasks);
    };





    const deleteHandler = (e, i) => {
        const taskToDelete = tasks[i];
        const copyTasks = [...tasks];

        if (tasks[i].completed || confirm("Are you sure you want to delete?")) {
            copyTasks.splice(i, 1);
            settasks(copyTasks);

            // Temporarily store the deleted task and index, and show the undo button
            setundodelete({ task: taskToDelete, index: i });
            setShowUndo(true);

            // Set a timer to hide the undo button after 5 seconds
            setTimeout(() => {
                setShowUndo(false);
                setundodelete({ task: null, index: null });
            }, 5000);
        } else {
            alert("Please complete the task");
        }
    };

    const undoDelete = () => {
        const { task, index } = undodelete;
        if (task && index !== null) {
            const restoredTasks = [...tasks];
            restoredTasks.splice(index, 0, task); // Re-insert the task at the original position
            settasks(restoredTasks);

            // Reset the undo state
            setundodelete({ task: null, index: null });
            setShowUndo(false);
        }
    };
  return (
    <>
                {/* Render task list */}
                <ul className="list-none w-[25%]">
                {rendertasks}
            </ul>

            {/* Undo Button */}
            {showUndo && (
                <div className="fixed bottom-5 right-5">
                    <button
                        onClick={undoDelete}
                        className="px-4 py-3 bg-orange-600 text-yellow-100 rounded-xl font-bold text-sm"
                    >
                        <h3 className='tracking-tighter font-mono'>Undo Delete</h3>
                    </button>
                </div>
            )}
    </>
  )
}

export default Show