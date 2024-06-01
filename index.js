import inquirer from 'inquirer';
import fs from 'fs-extra';
let tasks = [];
const filePath = './tasks.json';
// Load tasks from file
const loadTasks = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        tasks = JSON.parse(data);
    }
    catch (err) {
        tasks = [];
    }
};
// Save tasks to file
const saveTasks = async () => {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
};
// Main menu
const mainMenu = async () => {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: ['Add Task', 'Start Task', 'Stop Task', 'View Tasks', 'Exit'],
        },
    ]);
    switch (answer.action) {
        case 'Add Task':
            await addTask();
            break;
        case 'Start Task':
            await startTask();
            break;
        case 'Stop Task':
            await stopTask();
            break;
        case 'View Tasks':
            viewTasks();
            break;
        case 'Exit':
            console.log('Goodbye!');
            return;
    }
    await mainMenu();
};
// Add task
const addTask = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the task title:',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter the task description:',
        },
    ]);
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title: answers.title,
        description: answers.description,
        timeLogs: [],
        totalTime: 0,
    };
    tasks.push(newTask);
    await saveTasks();
    console.log('Task added successfully!');
};
// Start task
const startTask = async () => {
    if (tasks.length === 0) {
        console.log('No tasks available to start.');
        return;
    }
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter the ID of the task to start:',
            validate: (input) => {
                const id = parseInt(input);
                if (isNaN(id) || !tasks.some(task => task.id === id)) {
                    return 'Please enter a valid task ID.';
                }
                return true;
            },
        },
    ]);
    const taskId = parseInt(answer.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.timeLogs.push({ start: new Date(), end: null });
        await saveTasks();
        console.log('Task started successfully!');
    }
};
// Stop task
const stopTask = async () => {
    if (tasks.length === 0) {
        console.log('No tasks available to stop.');
        return;
    }
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter the ID of the task to stop:',
            validate: (input) => {
                const id = parseInt(input);
                if (isNaN(id) || !tasks.some(task => task.id === id)) {
                    return 'Please enter a valid task ID.';
                }
                return true;
            },
        },
    ]);
    const taskId = parseInt(answer.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const activeLog = task.timeLogs.find(log => log.end === null);
        if (activeLog) {
            activeLog.end = new Date();
            task.totalTime += new Date(activeLog.end).getTime() - new Date(activeLog.start).getTime();
            await saveTasks();
            console.log('Task stopped successfully!');
        }
        else {
            console.log('No active time log found for this task.');
        }
    }
};
// View tasks
const viewTasks = () => {
    if (tasks.length === 0) {
        console.log('No tasks available.');
    }
    else {
        tasks.forEach(task => {
            console.log(`ID: ${task.id}`);
            console.log(`Title: ${task.title}`);
            console.log(`Description: ${task.description}`);
            console.log(`Total Time Spent: ${(task.totalTime / 1000 / 60).toFixed(2)} minutes`);
            task.timeLogs.forEach(log => {
                console.log(`- Start: ${log.start}`);
                console.log(`  End: ${log.end ? log.end : 'In progress'}`);
            });
            console.log('------------------------');
        });
    }
};
// Start the application
const startApp = async () => {
    await loadTasks();
    await mainMenu();
};
startApp();
