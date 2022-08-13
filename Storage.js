import AsyncStorage from '@react-native-async-storage/async-storage';
/*
{backlogTasks: [id, id2, id3]}
{frontlogTasks: [id, id2, id3]}
{tasks: [Task, Task]}
{taskMaxId: int}
Task: {
  id: int
  title: string
  extraInfo: string
}
 */
const storage = {
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  getItem: async key => {
    try {
      return JSON.parse(await AsyncStorage.getItem(key));
    } catch (e) {
      console.log('\nERROR\n');
      throw e;
    }
  },
  removeItem: async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  clear: async () => {
    try {
      await AsyncStorage.clear();
      async function defaultStorage() {
        const backlog = await storage.getItem('backlogTasks');
        const frontlog = await storage.getItem('frontlogTasks');
        const tasks = await storage.getItem('tasks');
        const maxId = await storage.getItem('taskMaxId');
        if (backlog === null) await storage.setItem('backlogTasks', []);
        if (frontlog === null) await storage.setItem('frontlogTasks', []);
        if (tasks === null) await storage.setItem('tasks', []);
        if (maxId === null) await storage.setItem('taskMaxId', 0);
      };
      await defaultStorage();
    } catch (e) {
      throw e;
    }
  },
};

export default storage;
