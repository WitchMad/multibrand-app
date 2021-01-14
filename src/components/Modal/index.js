import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Modal as RNModal,
  Platform,
} from 'react-native';

import styles from './styles';

const Modal = ({visible, children, onRequestClose}) => {
  return (
    <RNModal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onRequestClose}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.content}>{children}</View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

export default Modal;
