function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    const calendarInput = document.getElementById('calendarInput').value;
    const timeInput = document.getElementById('timeInput').value;
  
    // Convert date and time strings to a JavaScript Date object
    const dateTimeString = `${calendarInput}T${timeInput}`;
    const allocatedTime = new Date(dateTimeString).getTime();
  
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    const existingTasks = taskList.filter(task => task.allocatedTime === allocatedTime);
  
    // Check if there are already tasks for the same date and time
    if (existingTasks.length > 0) {
      // Add the new task to the existing tasks for the same date and time
      existingTasks.push({ task: taskInput, allocatedTime: allocatedTime });
    } else {
      // No existing tasks for the same date and time, create a new array of tasks
      taskList.push({ task: taskInput, allocatedTime: allocatedTime });
    }
  
    localStorage.setItem('tasks', JSON.stringify(taskList));
    document.getElementById('taskInput').value = '';
    showCalendar();
  }
  
  function showCalendar() {
    const calendarDiv = document.getElementById('calendar');
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    let calendarHTML = '';
  
    taskList.forEach((taskItem) => {
      const allocatedDate = new Date(taskItem.allocatedTime);
      calendarHTML += `<div>${taskItem.task} - ${allocatedDate.toLocaleString()}</div>`;
    });
  
    calendarDiv.innerHTML = calendarHTML;
  }
  
  function showNotification(message) {
    const notificationBar = document.getElementById('notificationBar');
    notificationBar.textContent = message;
    notificationBar.style.display = 'block';
  
    setTimeout(() => {
      notificationBar.style.display = 'none';
    }, 5000); // Display the notification for 5 seconds
  }
  
  function checkNotifications() {
    const currentTime = new Date().getTime();
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  
    taskList.forEach((taskItem, index) => {
      if (currentTime >= taskItem.allocatedTime) {
        // Show the notification with the task name
        showNotification(`It's time for: ${taskItem.task}`);
  
        // Remove the task after showing the notification
        taskList.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(taskList));
      }
    });
  }
  
  // Check for notifications every second
  setInterval(checkNotifications, 1000);
  
  // Display existing tasks on page load
  showCalendar();
  