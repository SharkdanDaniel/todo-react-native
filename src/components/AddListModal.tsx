import React from 'react'
import {
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import { Button, Overlay } from 'react-native-elements'

const AddListModal = ({
    visible,
    setVisible,
    submit,
    title,
    placeholder,
}: any) => {
    const [value, setValue] = React.useState('')

    const onSubmit = () => {
        submit(value)
        setValue('')
        setVisible(false)
    }

    const dismiss = () => {
        setVisible(false)
        setValue('')
    }

    return (
        <Overlay
            style={styles.modalView}
            isVisible={visible}
            onBackdropPress={dismiss}
            animationType="fade"
        >
            <View style={styles.wrapper}>
                <Text style={styles.title}>{title || 'Adicionar'}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setValue(value)}
                    value={value}
                    placeholder={placeholder || 'Digite o nome'}
                />
                <View style={styles.btnGroup}>
                    <Button
                        title="Cancelar"
                        onPress={dismiss}
                        buttonStyle={styles.btnCancel}
                        titleStyle={{ color: '#414141' }}
                    ></Button>
                    <Button
                        title="Salvar"
                        onPress={onSubmit}
                        buttonStyle={styles.btnConfirm}
                    ></Button>
                </View>
            </View>
        </Overlay>
    )
}

export default AddListModal

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 0,
        alignItems: 'center',
        shadowColor: '#000',
        width: 100
    },
    wrapper: {
        margin: 5,
        borderRadius: 15,
        width: '50%',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10,
    },
    input: {
        width: Dimensions.get('window').width * 0.7,
        marginBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#c4c4c4'
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnCancel: {
        width: Dimensions.get('window').width * 0.3,
        backgroundColor: '#e2e2e2',
        marginRight: 5,
    },
    btnConfirm: {
        width: Dimensions.get('window').width * 0.3,
    },
})
