import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {useSelector, useDispatch} from 'react-redux';
import {getProjectsRequest} from '~/store/modules/projects/actions';

import NewProject from '~/components/NewProject';
import Can from '~/components/Can';

import styles from './styles';

const Projects = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const {data: projects} = useSelector((state) => state.projects);
  const {active} = useSelector((state) => state.teams);

  useEffect(() => {
    if (active) {
      dispatch(getProjectsRequest());
    }
  }, [dispatch, active]);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.projectsList}
        data={projects}
        keyExtractor={(project) => String(project.id)}
        renderItem={({item}) => (
          <View style={styles.projectContainer} key={item.id}>
            <Text style={styles.projectTitle}>{item.title}</Text>
          </View>
        )}
      />
      {active && (
        <Can checkPermission="projects-create">
          <TouchableOpacity
            style={styles.newProjectButton}
            onPress={() => setOpen(true)}>
            <Icon name="add" size={28} color="#fff" />
          </TouchableOpacity>
        </Can>
      )}
      <NewProject visible={open} onRequestClose={() => setOpen(false)} />
    </View>
  );
};

export default Projects;
