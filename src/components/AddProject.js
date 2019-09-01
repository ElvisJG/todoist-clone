import React, { useState } from 'react';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers';
import { useProjectsValue } from '../context';

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');

  const projectId = generatePushId();
  const { setProjects } = useProjectsValue();

  const AddProject = () =>
    projectName &&
    firebase
      .firestore()
      .collection('projects')
      .add({
        projectId,
        name: projectName,
        userId: 'hiremepls'
      })
      .then(() => {
        setProjects([]);
        setProjectName('');
        setShow(false);
      });

  return (
    <div className='add-project' data-testId='add-project'>
      {show && (
        <div className='add-project__input'>
          <input
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            className='add-project__name'
            data-testId='project-name'
            type='text'
            placeholder='Name your Project'
          />
          <button
            className='add-project__submit'
            type='button'
            onClick={() => AddProject()}
            data-testId='add-project-submit'
          >
            Add Project
          </button>
          <span
            data-testId='hide-project-overlay'
            className='add-project__cance'
            onClick={() => setShow(false)}
          >
            Cancel
          </span>
        </div>
      )}
      <span className='add-project__plus'>+</span>
      <span
        data-testId='add-project-action'
        className='add-project__text'
        onClick={() => setShow(!show)}
      >
        Add Project
      </span>
    </div>
  );
};
