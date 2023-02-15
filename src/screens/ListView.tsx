import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import { CheckBox, FAB } from 'react-native-elements'
import { useRoute } from '@react-navigation/core'
import { List, Task } from '../models/List.model'
import AddListModal from '../components/AddListModal'
import taskService from '../services/task-service';
import ConfirmModal from '../components/ConfirmModal'
import listService from '../services/list-service';

const ListView = () => {
    const [data, setData] = React.useState({} as List)
    const [addModalVisible, setAddModalVisible] = React.useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = React.useState(false)
    const [deleteId, setDeleteId] = React.useState('')
    const route = useRoute();

    const handleAddTask = async (name: 'string') => {
        const result = await taskService.saveTask(data, name)
        if (result) {
            loadList(result.id!)
        }
    }

    const handleDelete = (id: any) => {
        setDeleteModalVisible(true)
        setDeleteId(id)
    }

    const editTask = async (task: Task) => {
        const result = await taskService.updateTask(data, task);
        if (result) {
            loadList(result.id!)
        }
    }

    const handleStatus = (task: Task) => {
        task.done = !task.done
        editTask(task);
    }

    const deleteTask = async (id: string) => {
        const result = await taskService.removeTask(data, id)
        console.log(result)
        if (result) loadList(result.id!)
        setDeleteModalVisible(false)
        console.log(data)
    }

    const loadList = async (id: string) => {
        const result = await listService.findList(id)
        if (result) setData(result)
    }

    React.useEffect(() => {
        const list = JSON.parse((route.params as any).list)
        loadList(list.id)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>{data?.name}</Text>
                <FlatList
                    style={styles.tasks}
                    data={data.tasks}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyMessage}>Nenhuma tarefa encontrada</Text>
                        </View>
                    }
                    keyExtractor={(item) => String(item.id)}
                    // listKey={(item: any, index: any) => (item.id.toString() + index)}
                    renderItem={({ item }) => (
                        <View style={styles.task}>
                            <CheckBox
                                checked={item.done}
                                onPress={() => handleStatus(item)}
                                size={20}
                            />
                            <TouchableOpacity onLongPress={() => handleDelete(item.id)}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        textDecorationLine: item.done ? 'line-through' : 'none',
                                        width: '80%',
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    )}
                />
            </View>
            <FAB
                placement="right"
                icon={{ name: 'add', color: '#fff' }}
                buttonStyle={styles.fab}
                onPress={() => setAddModalVisible(true)}
            />
            <AddListModal
                visible={addModalVisible}
                setVisible={setAddModalVisible}
                title="Nova tarefa"
                submit={handleAddTask}
            />
            <ConfirmModal
                title="Excluir esta tarefa?"
                value={deleteId}
                visible={deleteModalVisible}
                setVisible={setDeleteModalVisible}
                submit={deleteTask}
            />
        </View>
    )
}

export default ListView

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        margin: 20,
        marginBottom: 40
    },
    title: {
        fontSize: 34,
        fontWeight: '500',
        marginBottom: 15,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height * 0.6,
      },
      emptyMessage: {
        // flex: 1,
        // textAlign: 'center',
        // textAlignVertical: 'center',
        // height: Dimensions.get('window').height,
      },
    tasks: {
        marginHorizontal: 0
    },
    task: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dddddd',
        backgroundColor: '#f0f0f0',
        marginBottom: 10
    },
    fab: {
        color: '#fff',
        backgroundColor: '#3D6DCC',
    },
})
