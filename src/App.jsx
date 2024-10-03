// import { nanoid } from 'nanoid'
// import { useState } from 'react';
// const App = () => {

    
//    const [tasks, settasks] = useState([])
//    const [title, settitle] = useState("")
//    const [undodelete, setundodelete] = useState([])

//     const submitHandler = (e) => {
//         e.preventDefault();

//         const task = {
//             id: nanoid(),
//             title: title,
//             completed: false,
//         }
//         const copytask = [...tasks]
//         copytask.push(task);
//         settasks(copytask);
//         settitle("") 
//         // settasks([...tasks , task]);

//     }
//     const completeHandler = (e, index) => {
//         const copytasks = [...tasks]
//         copytasks[index].completed =!copytasks[index].completed
//         settasks(copytasks)
//     }
//     const deleteHandler = (e, i) => {
//         const taskToDelete = tasks[i]; // Temporarily store the task
//         const copyTasks = [...tasks];
        
//         if (tasks[i].completed || confirm("Are you sure you want to delete?")) {
//             copyTasks.splice(i, 1);
//             settasks(copyTasks);
            
//             // Show undo option
//             showUndoNotification(taskToDelete, i);
//         } else {
//             alert("Please complete the task");
//         }
//     };
    
//     // Function to show undo notification
//     const showUndoNotification = (task, index) => {
//         const undoTimeout = setTimeout(() => {
//             console.log("Task deletion confirmed, undo time expired.");
//         }, 5000); // Give the user 5 seconds to undo
    
//         if (window.confirm("Task deleted! Do you want to undo?")) {
//             clearTimeout(undoTimeout);
//             undoDelete(task, index);
//         }
//     };
    
//     // Function to undo the deletion
//     const undoDelete = (task, index) => {
//         const restoredTasks = [...tasks];
//         restoredTasks.splice(index, 0, task); // Re-insert the task at the original position
//         settasks(restoredTasks);
//         console.log("Task restored.");
//     };
    
    
//     let rendertasks = (
//         <h1 className='text-yellow-100 text-2xl text-center font-bold mt-10'>No Tasks Yet</h1>
//     )
//     if(tasks.length > 0) {
//         rendertasks = tasks.map((task,index)=>{
//             return(
//                 <li key={index} className="mb-5 flex justify-between items-center border rounded-xl p-5">
//                 <div className="flex items-center">
//                     <div
//                     onClick={(e)=> completeHandler(e,index)} 
//                     className={`${task.completed ? "bg-green-600 border-none" :"border border-orange-600" } mr-4 rounded-full w-[30px] h-[30px] `}></div>
//                     <h1 className={`${task.completed ? "line-through": "" } text-2xl font-extrabold text-yellow-100`}>
//                         {task.title}
//                     </h1>
//                 </div>
//                 <div className="flex gap-3 text-2xl text-yellow-100">
//                     <i className="ri-file-edit-line"></i>
//                     <i onClick={(e)=> deleteHandler(e, index)} className="ri-delete-bin-3-line"></i>
//                 </div>
//             </li>
//             )
//         })
//     }
//     return (
//         <div className=" border-t-2 w-screen h-screen bg-zinc-800 flex  items-center flex-col">
//             <div className="mt-[7%] w-[25%] h-[20%] border rounded-3xl flex justify-around items-center">
//                 <div className="text-yellow-100">
//                     <h1 className="text-3xl font-bold">LETS TODO</h1>
//                     <p>Keeps doing things</p>
//                 </div>
//                 <div className="text-4xl font-extrabold flex justify-center items-center w-[120px] h-[120px] rounded-full bg-orange-600">
//                     {tasks.filter((task)=> task.completed).length}/{tasks.length}
//                 </div>
//             </div>
//             {/*  */}
//             <form onSubmit={submitHandler} className="w-[25%] flex justify-between px-5 my-[2%]">
//                 <input
//                     onChange={(e) => settitle(e.target.value)}
//                     value={title}
//                     placeholder="write your next task..."
//                     className="px-5 py-3 text-yellow-100 outline-none w-[85%] rounded-xl bg-zinc-700 "
//                     type="text"
//                     required
//                 />
//                 <button className="outline-none text-4xl font-extrabold flex justify-center items-center w-[50px] h-[50px] rounded-full bg-orange-600">
//                     <i className="ri-add-fill"></i>
//                 </button>
//             </form>
//             {/*  */}
//             <ul className="list-none w-[25%] ">
//                 {rendertasks}
//             </ul>
//         </div>
//     );
// };

// export default App;

import { nanoid } from 'nanoid';
import { useState } from 'react';

const App = () => {
    const [tasks, settasks] = useState([]);
    const [title, settitle] = useState("");
    const [undodelete, setundodelete] = useState({ task: null, index: null });
    const [showUndo, setShowUndo] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
            // Trim the title input to remove leading/trailing spaces
    const trimmedTitle = title.trim();

    // Ensure the trimmed title is not empty
    if (trimmedTitle.length === 0) {
        alert("Task title cannot be empty!");
        return;
    }
        const task = {
            id: nanoid(),
            title: trimmedTitle,
            completed: false,
        };
        settasks([...tasks, task]);
        settitle("");
    };

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

    return (
        <div className="border-t-2 w-screen h-screen bg-zinc-800 flex items-center flex-col">
            <div className="mt-[7%] w-[25%] h-[20%] border rounded-3xl flex justify-around items-center">
                <div className="text-yellow-100">
                    <h1 className="text-3xl font-bold">LETS TODO</h1>
                    <p>Keeps doing things</p>
                </div>
                <div className="text-4xl font-extrabold flex justify-center items-center w-[120px] h-[120px] rounded-full bg-orange-600">
                    {tasks.filter((task) => task.completed).length}/{tasks.length}
                </div>
            </div>

            {/* Task input form */}
            <form onSubmit={submitHandler} className="w-[25%] flex justify-between px-5 my-[2%]">
                <input
                    onChange={(e) => settitle(e.target.value)}
                    value={title}
                    placeholder="write your next task..."
                    className="px-5 py-3 text-yellow-100 outline-none w-[85%] rounded-xl bg-zinc-700"
                    type="text"
                    required
                />
                <button className="outline-none text-4xl font-extrabold flex justify-center items-center w-[50px] h-[50px] rounded-full bg-orange-600">
                    <i className="ri-add-fill"></i>
                </button>
            </form>

            {/* Render task list */}
            <ul className="list-none w-[25%]">
                {rendertasks}
            </ul>

            {/* Undo Button */}
            {showUndo && (
                <div className="fixed bottom-5 right-5">
                    <button
                        onClick={undoDelete}
                        className="px-4 py-3 bg-orange-500 text-yellow-100 rounded-xl font-bold text-sm"
                    >
                        Undo Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;
