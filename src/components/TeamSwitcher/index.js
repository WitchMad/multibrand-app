import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {useDispatch, useSelector} from 'react-redux';

import {getTeamsRequest, selectTeam} from '~/store/modules/teams/actions';
import {signOut} from '~/store/modules/auth/actions';

import NewTeam from '~/components/NewTeam';

import styles from './styles';

const TeamSwitcher = () => {
  const dispatch = useDispatch();
  const {data: teams} = useSelector((state) => state.teams);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getTeamsRequest());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {teams.map((team) => (
        <TouchableOpacity
          key={team.id}
          style={styles.teamContainer}
          onPress={() => dispatch(selectTeam(team))}>
          <Image
            style={styles.teamAvatar}
            source={{
              uri: `https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${team.name}`,
            }}
          />
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.newTeam} onPress={() => setOpen(true)}>
        <Icon name="add" size={24} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signOut}
        onPress={() => dispatch(signOut())}>
        <Icon name="logout" size={24} color="#FFF" />
      </TouchableOpacity>
      <NewTeam visible={open} onRequestClose={() => setOpen(false)} />
    </View>
  );
};

export default TeamSwitcher;
