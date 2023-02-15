import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Button, Overlay } from 'react-native-elements'

const ConfirmModal = ({ visible, setVisible, submit, value, title }: any) => {
    const onSubmit = () => {
        setVisible(false)
        submit(value)
    }

    return (
        <Overlay
            animationType="fade"
            statusBarTranslucent={true}
            style={styles.modalView}
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
        >
            <View style={styles.wrapper}>
                <Text style={styles.title}>{title || 'Confirmar?'}</Text>
                <View style={styles.btnGroup}>
                    <Button
                        title="Não"
                        onPress={() => setVisible(false)}
                        buttonStyle={styles.btnCancel}
                        titleStyle={{ color: '#414141' }}
                    ></Button>
                    <Button buttonStyle={styles.btnConfirm} title="Sim" onPress={onSubmit}></Button>
                </View>
            </View>
        </Overlay>
    )
}

export default ConfirmModal

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 0,
        alignItems: 'center',
        shadowColor: '#000',
    },
    wrapper: {
        margin: 5,
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.7
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 50
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnCancel: {
        width: Dimensions.get('window').width * 0.3,
        backgroundColor: '#e2e2e2',
        marginRight: 5
    },
    btnConfirm: {
        width: Dimensions.get('window').width * 0.3,
    }
})
