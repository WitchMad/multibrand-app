import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';

import {useDispatch} from 'react-redux';
import {createProjectRequest} from '~/store/modules/projects/actions';

import Modal from '~/components/Modal';

import styles from './styles';

const NewProject = ({visible, onRequestClose}) => {
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState('');

  async function handleSubmit() {
    dispatch(createProjectRequest(newProject));
    onRequestClose();
    setNewProject('');
  }

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <Text style={styles.label}>TÍTULO</Text>
      <TextInput
        style={styles.input}
        value={newProject}
        onChangeText={(text) => setNewProject(text)}
        autoFocus
        underlineColorAndroid="transparent"
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>CRIAR PROJETO</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancel} onPress={onRequestClose}>
        <Text style={styles.cancelText}>CANCELAR</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default NewProject;
