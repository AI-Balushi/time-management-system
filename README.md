### Advanced Time Management System in TypeScript

#### Project Description

The Advanced Time Management System is a comprehensive console-based application designed to help users manage their tasks and track the time spent on each task efficiently. Built using TypeScript, the application leverages the `inquirer` library for interactive command-line prompts and `fs-extra` for file operations, ensuring that all task data is persistently stored and retrievable.

#### Features

1. **Add Task**:
   - Allows users to create new tasks by providing a title and description.
   - Each task is assigned a unique ID for easy identification and management.

2. **Start Task**:
   - Enables users to start a timer for a selected task.
   - Records the start time of the task, allowing for precise time tracking.

3. **Stop Task**:
   - Allows users to stop the timer for a selected task.
   - Records the end time and calculates the total time spent on the task, adding it to the task's cumulative time.

4. **View Tasks**:
   - Displays a list of all tasks, including their details such as ID, title, description, total time spent, and individual time logs.
   - Provides a clear and organized view of each task’s time logs, showing start and end times for each logged session.

#### Project Structure

- **index.ts**: The main file containing all the logic and functionality of the time management system. It includes functions for adding tasks, starting and stopping timers, and viewing task logs.
- **tasks.json**: A JSON file used to store task data persistently. This file is read and written to by the application to maintain the state of tasks between sessions.

#### Workflow

1. **Initialization**:
   - The project is set up by initializing a Node.js project and installing the necessary dependencies, including TypeScript, `ts-node`, `inquirer`, and `fs-extra`.

2. **Main Menu**:
   - The application starts by displaying a main menu with options to add a task, start a task, stop a task, view tasks, or exit the application.
   - Users interact with the menu using command-line prompts provided by the `inquirer` library.

3. **Task Management**:
   - **Add Task**: Users are prompted to enter a title and description for a new task. The task is then added to the list and saved to the `tasks.json` file.
   - **Start Task**: Users select a task by ID to start the timer. The start time is recorded, and the task’s details are updated in the `tasks.json` file.
   - **Stop Task**: Users select a task by ID to stop the timer. The end time is recorded, the total time spent on the task is updated, and the task’s details are saved to the `tasks.json` file.
   - **View Tasks**: The application displays all tasks with their details, including the total time spent and individual time logs.

#### Data Persistence

- The application uses the `fs-extra` library for file operations, ensuring that all task data is saved to the `tasks.json` file.
- Tasks are loaded from the file when the application starts, and any changes (e.g., adding tasks, starting/stopping timers) are saved back to the file immediately.

#### Benefits

- **Efficiency**: Helps users manage their time more effectively by tracking the time spent on various tasks.
- **Organization**: Provides a clear and organized way to view tasks and their associated time logs.
- **Persistence**: Ensures that task data is not lost between sessions by storing it in a JSON file.

This project provides a robust solution for time management, allowing users to keep track of their tasks and the time spent on each, thus improving productivity and time management skills.