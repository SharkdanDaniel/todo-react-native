import React from 'react'
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
    RefreshControl
} from 'react-native'
import ViewTask from '../components/ViewTask'
import { FAB } from 'react-native-elements'
import AddListModal from '../components/AddListModal'
import listService from '../services/list-service'
import { List, Task } from '../models/List.model'
import ConfirmModal from '../components/ConfirmModal'
import {
    useNavigation,
    useIsFocused,
    useRoute,
} from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { format } from 'date-fns';
import * as Localization from 'expo-localization';
import locale from 'date-fns/locale/pt-BR';

const Home = () => {
    const [data, setData] = React.useState([] as List[])
    const [modalVisible, setModalVisible] = React.useState(false)
    const [addModalVisible, setAddModalVisible] = React.useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = React.useState(false)
    const [deleteId, setDeleteId] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false)

    const navigation = useNavigation<NativeStackNavigationProp<any, any>>()
    const isFocused = useIsFocused()
    const route = useRoute()

    const addList = async (value: any) => {
        const result = await listService.saveList(value)
        setAddModalVisible(false)
        if (result) {
            loadList()
        }
    }

    const openList = (list: List) => {
        navigation.navigate('ListView', { list: JSON.stringify(list) })
    }

    const deleteList = async (id: string) => {
        await listService.removeList(id)
        setDeleteModalVisible(false)
        loadList()
    }

    // const handleAddButton = () => {
    //     setOpen(false)
    //     setAddModalVisible(true)
    // }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await loadList();
        setRefreshing(false);
    }, [])

    const handleDelete = (id: any) => {
        setDeleteModalVisible(true)
        setDeleteId(id)
    }

    const loadList = async () => {
        const data = await listService.loadLists()
        if (data) setData(data)
    }

    // console.log(Localization.locale);

    React.useEffect(() => {
        loadList()
    }, [])

    React.useEffect(() => {
        navigation.addListener('state', (e) => {
            if (isFocused) loadList()
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            <View style={styles.wrapper}>
                <FlatList
                    // style={styles.list}
                    data={data}
                    horizontal={false}
                    numColumns={2}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyMessage}>Nenhuma lista encontrada</Text>
                        </View>
                    }
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            onLongPress={() => handleDelete(item.id)}
                            onPress={() => openList(item)}
                        >

                            <View>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.listTitle}
                                >
                                    {item.name}
                                </Text>
                                <FlatList
                                    style={styles.tasks}
                                    data={item.tasks}
                                    horizontal={false}
                                    listKey={String(item.id + Math.random())}
                                    keyExtractor={(task) => String(task.id)}
                                    renderItem={(task) => {
                                        if (task.index < 6)
                                            return (
                                                <Text
                                                    numberOfLines={1}
                                                    ellipsizeMode="tail"
                                                    style={styles.task}
                                                >
                                                    {task.item.name}
                                                </Text>
                                            )
                                        else return null
                                    }}
                                />
                            </View>

                            <Text style={styles.updatedDate}>{format(new Date(item.updatedAt), 'P pp', { locale })}</Text>
                        </TouchableOpacity>
                    )}
                />
                <ViewTask visible={modalVisible} setVisible={setModalVisible} />
            </View>
            <FAB
                placement="right"
                icon={{ name: 'add', color: '#fff' }}
                buttonStyle={styles.fab}
                onPress={() => setAddModalVisible(true)}
            />
            <AddListModal
                title="Nova lista"
                visible={addModalVisible}
                setVisible={setAddModalVisible}
                submit={addList}
            />
            <ConfirmModal
                title="Excluir esta lista?"
                value={deleteId}
                visible={deleteModalVisible}
                setVisible={setDeleteModalVisible}
                submit={deleteList}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        margin: 20,
        marginBottom: 40,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 25,
        color: '#fff',
    },
    list: {
        alignContent: 'space-around',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height * 0.7,
    },
    emptyMessage: {
        // flex: 1,
        // textAlign: 'center',
        // textAlignVertical: 'center',
        // height: Dimensions.get('window').height,
    },
    card: {
        backgroundColor: '#f1f1f1',
        height: 180,
        borderRadius: 20,
        padding: 10,
        width: '48%',
        marginRight: 10,
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    tasks: {
        marginTop: 7,
        overflow: 'hidden',
    },
    listTitle: {
        flex: 0,
        fontSize: 14,
        fontWeight: '500',
    },
    updatedDate: {
        flex: 0,
        fontSize: 12,
        color: '#777880',
    },
    task: {
        flex: 0,
        fontSize: 12,
        color: '#777880',
        overflow: 'hidden',
    },
    fab: {
        color: '#fff',
        backgroundColor: '#3D6DCC',
    },
})
