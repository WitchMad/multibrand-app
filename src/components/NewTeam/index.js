import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';

import {useDispatch} from 'react-redux';
import {createTeamRequest} from '~/store/modules/teams/actions';

import Modal from '~/components/Modal';

import styles from './styles';

const NewTeam = ({visible, onRequestClose}) => {
  const dispatch = useDispatch();
  const [newTeam, setNewTeam] = useState('');

  async function handleSubmit() {
    dispatch(createTeamRequest(newTeam));
    onRequestClose();
    setNewTeam('');
  }

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <Text style={styles.label}>NOME</Text>
      <TextInput
        style={styles.input}
        value={newTeam}
        onChangeText={(text) => setNewTeam(text)}
        autoFocus
        underlineColorAndroid="transparent"
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>CRIAR TIME</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancel} onPress={onRequestClose}>
        <Text style={styles.cancelText}>CANCELAR</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default NewTeam;
