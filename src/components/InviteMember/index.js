import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';

import Modal from '~/components/Modal';

import {useDispatch} from 'react-redux';
import {inviteMemberRequest} from '~/store/modules/members/actions';

import styles from './styles';

const InviteMember = ({visible, onRequestClose}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  async function handleSubmit() {
    dispatch(inviteMemberRequest(email));
    onRequestClose();
    setEmail('');
  }

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <Text style={styles.label}>E-MAIL</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoFocus
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        underlineColorAndroid="transparent"
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>CONVIDAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancel} onPress={onRequestClose}>
        <Text style={styles.cancelText}>CANCELAR</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default InviteMember;
