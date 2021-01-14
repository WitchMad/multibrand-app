import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SideMenu from 'react-native-side-menu';

import {useSelector} from 'react-redux';

import TeamSwitcher from '~/components/TeamSwitcher';
import Projects from '~/components/Projects';
import Members from '~/components/Members';

import styles from './styles';

const Main = () => {
  const [open, setOpen] = useState({
    leftOpen: false,
    rightOpen: false,
  });
  const {active} = useSelector((state) => state.teams);

  function toggleMenu(position, isOpen) {
    setOpen({...open, [`${position}Open`]: isOpen});
  }

  return (
    <View style={styles.backgroundWrapper}>
      <SideMenu
        isOpen={open.leftOpen}
        disableGestures
        onChange={(isOpen) => toggleMenu('left', isOpen)}
        openMenuOffset={70}
        menu={<TeamSwitcher />}>
        <SideMenu
          isOpen={open.rightOpen}
          disableGestures
          onChange={(isOpen) => toggleMenu('right', isOpen)}
          openMenuOffset={285}
          menuPosition="right"
          menu={<Members />}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => toggleMenu('left', true)}
                hitSlop={{top: 5, bottom: 5, left: 10, right: 10}}>
                <Icon name="menu" size={24} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.teamTitle}>
                {active ? active.name : 'Selecione um time'}
              </Text>
              <TouchableOpacity
                onPress={() => toggleMenu('right', true)}
                hitSlop={{top: 5, bottom: 5, left: 10, right: 10}}>
                <Icon name="group" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
            <Projects />
          </View>
        </SideMenu>
      </SideMenu>
    </View>
  );
};

export default Main;
