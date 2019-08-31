import { tasks } from '../constants';

export const tasksExist = selectedProject =>
  tasks.find(task => task.key === selectedProject);
