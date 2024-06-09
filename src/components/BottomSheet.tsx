import React, { forwardRef, Ref } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

interface FilterBottomSheetProps {
    children: React.ReactNode;
  }

const BottomSheet = forwardRef((props: FilterBottomSheetProps, ref: Ref<any>) => {
  return (
    <RBSheet
      ref={ref}
      height={300}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}
    >
      <View style={styles.container}>
        {props.children}
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default BottomSheet;
