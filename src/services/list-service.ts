import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { List, Task } from "../models/List.model";
import uuid from 'react-native-uuid';

const saveList = async (name: string) => {
    try {
        const data = await AsyncStorage.getItem('@notetodo:list');
        const oldLists = data ? JSON.parse(data) : [];
        const list: List = {
            name,
            id: uuid.v4() as string,
            createdAt: new Date(),
            updatedAt: new Date(),
            tasks: [],
        }

        const newLists = [...oldLists, list];
        await AsyncStorage.setItem('@notetodo:list', JSON.stringify(newLists));
        return list;
    } catch (error: any) {
        Alert.alert('Não foi possível salvar esta lista!')
        throw new Error(error)
    }
}

const findList = async (id: string) => {
    try {
        const data = await AsyncStorage.getItem('@notetodo:list');
        const oldLists = data ? JSON.parse(data) as List[] : [];
        const list = oldLists.find((res) => res.id == id);
        if (list?.tasks?.length) {
            list.tasks = list?.tasks?.sort((a: any, b: any) => ((!a.done && b.done) ? a : b) - 1);
        }
        return list;
    } catch (error: any) {
        Alert.alert('Não foi possível encontrar esta lista!')
        throw new Error(error)
    }
}

const editList = async (list: List) => {
    try {
        const data = await AsyncStorage.getItem('@notetodo:list');
        const lists = data ? JSON.parse(data) : [];
        list.updatedAt = new Date();
        lists[list.id!] = list;
        await AsyncStorage.setItem('@notetodo:list', JSON.stringify(lists));
        return list;
    } catch (error: any) {
        Alert.alert('Não foi possível editar esta lista!')
        throw new Error(error)
    }
}

const loadLists = async () => {
    try {
        const data = await AsyncStorage.getItem('@notetodo:list');
        const lists = data ? JSON.parse(data) as List[] : [];
        const listsSorted = lists.sort((a: any, b: any) => a.name !== 'testou' ? a : b);
        return listsSorted;
    } catch (error: any) {
        Alert.alert('Não foi possível carregar as listas!')
        throw new Error(error)
    }
}

const removeList = async (id: string) => {
    try {
        const data = await AsyncStorage.getItem('@notetodo:list');
        const lists = data ? JSON.parse(data) as List[] : [];
        const filtedList = lists.filter((list) => list.id !== id);
        await AsyncStorage.setItem('@notetodo:list', JSON.stringify(filtedList));
        return true;
    } catch (error: any) {
        Alert.alert('Não foi possível carregar as listas!')
        throw new Error(error)
    }
}

const listService = module.exports = {
    saveList,
    findList,
    editList,
    loadLists,
    removeList
}

export default listService;
