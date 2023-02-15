import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { List, Task } from "../models/List.model";
import uuid from 'react-native-uuid';

const saveTask = async (list: List, name: string) => {
    try {
        const data = await AsyncStorage.getItem('@notetodo:list');
        const oldLists = data ? JSON.parse(data) as List[] : [];
        const index = oldLists.findIndex((res) => res.id == list.id);
        const task: Task = {
            name,
            id: uuid.v4() as string,
            done: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        list.updatedAt = new Date();
        if (!list.tasks?.length) list.tasks = [];
        list.tasks?.push(task);
        oldLists[index] = list;
        await AsyncStorage.setItem('@notetodo:list', JSON.stringify(oldLists));
        return list;
    } catch (error: any) {
        Alert.alert('Não foi possível salvar esta tarefa!')
        throw new Error(error)
    }
}

const updateTask = async (list: List, task: Task) => {
    try {
        const data = await AsyncStorage.getItem('@notetodo:list');
        const oldLists = data ? JSON.parse(data) as List[] : [];
        const listIndex = oldLists.findIndex((res) => res.id == list.id);
        task.updatedAt = new Date();
        list.tasks = list.tasks?.map((res) => res.id == task.id ? task : res);
        list.updatedAt = new Date();
        oldLists[listIndex] = list;
        await AsyncStorage.setItem('@notetodo:list', JSON.stringify(oldLists));
        return list;
    } catch (error: any) {
        Alert.alert('Não foi possível excluir esta tarefa!')
        throw new Error(error)
    }
}
const removeTask = async (list: List, id: string) => {
    try {
        const data = await AsyncStorage.getItem('@notetodo:list');
        const oldLists = data ? JSON.parse(data) as List[] : [];
        const index = oldLists.findIndex((res) => res.id == list.id);
        list.tasks = list.tasks?.filter((res) => res.id !== id);
        list.updatedAt = new Date();
        oldLists[index] = list;
        await AsyncStorage.setItem('@notetodo:list', JSON.stringify(oldLists));
        return list;
    } catch (error: any) {
        Alert.alert('Não foi possível excluir esta tarefa!')
        throw new Error(error)
    }
}

const taskService = module.exports = {
    saveTask,
    updateTask,
    removeTask
}

export default taskService;
