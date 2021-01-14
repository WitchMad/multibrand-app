import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {getMembersRequest} from '~/store/modules/members/actions';

import InviteMember from '~/components/InviteMember';
import RoleUpdater from '~/components/RoleUpdater';
import Can from '~/components/Can';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const Members = () => {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [rolesModalOpen, setRolesModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const {active} = useSelector((state) => state.teams);

  function toggleRoleModalOpen(member) {
    setRolesModalOpen(true);
    setEditMember(member);
  }
  function toggleRoleModalClose() {
    setRolesModalOpen(false);
    setEditMember(null);
  }

  const disptach = useDispatch();

  useEffect(() => {
    disptach(getMembersRequest());
  }, [disptach]);

  const {data: members} = useSelector((state) => state.members);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MEMBROS</Text>

      <FlatList
        style={styles.memberList}
        data={members}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => (
          <View style={styles.memberContainer}>
            <Text style={styles.memberName}>{item.user.name}</Text>
            <Can checkRole="administrator">
              <TouchableOpacity
                onPress={() => toggleRoleModalOpen(item)}
                hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                <Icon name="settings" size={20} color="#b0b0b0" />
              </TouchableOpacity>
            </Can>
          </View>
        )}
        ListFooterComponent={() => (
          <>
            {active ? (
              <Can checkPermission="invites-create">
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setInviteModalOpen(true)}>
                  <Text style={styles.buttonText}>Convidar</Text>
                </TouchableOpacity>
              </Can>
            ) : (
              <Text style={styles.title}>Selecione um time</Text>
            )}
          </>
        )}
      />

      <Can checkPermission="invites-create">
        <InviteMember
          visible={inviteModalOpen}
          onRequestClose={() => setInviteModalOpen(false)}
        />
      </Can>
      {editMember && (
        <RoleUpdater
          visible={rolesModalOpen}
          onRequestClose={toggleRoleModalClose}
          member={editMember}
        />
      )}
    </View>
  );
};

export default Members;
