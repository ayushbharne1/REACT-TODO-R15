import React, { useState } from 'react'
import { nanoid } from 'nanoid'

const Create = (props) => {
    const [title, settitle] = useState("");
    const { tasks, settasks } = props;

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


  return (
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

  )
}

export default Create