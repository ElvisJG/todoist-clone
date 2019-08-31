import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { tasksExist } from '../helpers';

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  // Firebase obtains tasks where UID == 1
  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', '1');

    // pass in a selected project, if it doesn't exist in exist in tasksExist, projectID fires off
    // and gets projects using projectID. The project is checked if it is equal to TODAY. Moment
    // creates a nice date for us. Similarly checks INBOX.
    unsubscribe =
      selectedProject && !tasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY')
          ))
        : selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        : unsubscribe;

    // Firebase onSnapshot sets newTasks using their id and spreads the rest of the data
    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data()
      }));

      // tasks are filtered through, if the tasks are from the next 7 days AND not archived then
      // sorts between current and new tasks
      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
              task =>
                moment(task.data, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                task.archived !== true
            )
          : newTasks.filter(task => task.archived !== true)
      );

      // Returns all true archived tasks
      setArchivedTasks(newTasks.filter(task => task.archived !== false));
    });

    // Ensures projects are only checked when there is new selectedProject
    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  // Checks our projects collection, where userID is 1. Orders projects by ID, new projects first
  // using get makes it only happen once per event, unlike the useTasks hook
  // useTasks is using RTDB (Real Time Data Base) by continously checking state.
  // snapshot gets project data, spreads the data and gets the docID (IMPORTANT)
  // To avoid this hook from looping we do a comparison of the objects to see if they have actually changed
  // If they have changed, set all projects
  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', '1')
      .orderBy('projectId')
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          ...project.data(),
          docId: project.id
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
