import React from 'react'
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import { List } from '../models/List.model';

const ViewTask = ({ visible, setVisible }: any) => {
    // const [visible, setVisible] = React.useState(false);
    return (
        <View style={styles.container}>
            <Modal
                style={styles.modalView}
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                <Pressable onPress={() => setVisible(!visible)}>
                    <Text>{'<'}</Text>
                </Pressable>
                <Text>testando</Text>
            </Modal>
        </View>
    )
}

export default ViewTask

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        backgroundColor: '#fff',
        height: '100%'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
})
