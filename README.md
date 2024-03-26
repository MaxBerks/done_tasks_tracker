# Progress Tracker Calendar App

## Introduction

The Progress Tracker Calendar App is a state-of-the-art tool designed to help individuals keep track of their tasks and monitor their progress over time. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this application offers a dynamic and interactive experience for managing daily tasks. Users can add tasks to a list, mark them as completed on specific days, and utilize filters to review their accomplishments.

## Features

- **Task Management:** Easily add tasks to your personal task list and keep track of what needs to be done.
- **Daily Progress Tracking:** Mark tasks as completed for each day, helping you stay organized and motivated.
- **Filter by Date:** Use the calendar's filtering capability to view tasks that were completed on specific days, allowing you to monitor your progress and identify patterns.
- **Data Persistence:** With MongoDB integration, your tasks and progress are saved, so you can pick up right where you left off.

## Prerequisites

- Docker: Ensure Docker is installed on your system. You can download and install Docker from [here](https://docs.docker.com/get-docker/).
- Docker Compose: Ensure Docker Compose is installed on your system. You can follow the installation instructions [here](https://docs.docker.com/compose/install/).

## Getting Started

1. **Clone the Repository**: Clone the repository containing the project code.
    ```bash
    git clone https://github.com/MaxBerks/done_tasks_tracker.git
    cd done_tasks_tracker
    ```
   
2. **Build the Docker image and start the container with the following command**:
    
    ```bash
    docker-compose up -d
    ```
## Running the Application

- Once the container is up and running, access the application in a web browser by navigating to `http://localhost:80`.

## Usage

After starting the app, you will be presented with a calendar view and a task list on the right sidebar.
- **Adding Tasks:** Open the right sidebar by clicking on the arrow, then click the "+" button and fill out the form to add a new task to your list. Press the "+" button to finish.
- **Marking Tasks as Done:** Click on the day where you want to mark a task, then click the checkbox next to the task name to mark it as completed for the selected day.
- **Viewing Progress:** Use the calendar's filter feature to select a date and view tasks completed on that day. Go to the task list (right sidebar) and click on the checkbox next to the desired task name.