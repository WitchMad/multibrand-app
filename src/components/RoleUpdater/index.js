import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import api from '~/services/api';

import Modal from '~/components/Modal';

import {useDispatch} from 'react-redux';
import {updateMemberRequest} from '~/store/modules/members/actions';

import styles from './styles';

const RoleUpdater = ({visible, onRequestClose, member}) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    async function loadRoles() {
      const {data} = await api.get('roles');
      setRoles(data);
    }
    loadRoles();
  }, []);

  const dispatch = useDispatch();

  function handleRoleChange(value, role) {
    const rolesMember = value
      ? [...member.roles, role]
      : member.roles.filter((memberRole) => memberRole.id !== role.id);
    dispatch(updateMemberRequest(member.id, rolesMember));
    onRequestClose();
  }

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <View>
        {roles.map((role) => (
          <View key={role.id} style={styles.roleContainer}>
            <Text style={styles.roleText}>{role.name}</Text>
            <Switch
              value={
                !!member.roles.find((memberRole) => memberRole.id === role.id)
              }
              onValueChange={(value) => handleRoleChange(value, role)}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={onRequestClose} style={styles.cancel}>
        <Text style={styles.cancelText}>Voltar</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default RoleUpdater;
