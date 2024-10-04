
import { nanoid } from 'nanoid';
import { useState } from 'react';
import Header from './components/Header';
import Create from './components/Create';
import Show from './components/Show';

const App = () => {
    const [tasks, settasks] = useState([]);
    




    return (
        <div className="border-t-2 w-screen h-screen bg-zinc-800 flex items-center flex-col">
            <Header tasks={tasks} settasks={settasks}/>
            {/* Task input form */}
            <Create tasks={tasks} settasks={settasks}/>
            <Show tasks={tasks} settasks={settasks}/>

        </div>
    );
};

export default App;
