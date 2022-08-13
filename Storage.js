import AsyncStorage from '@react-native-async-storage/async-storage';
/*
{backlogTasks: [id, id2, id3]}
{frontlogTasks: [id, id2, id3]}
{tasks: [Task, Task]}
{taskMaxId: int}
{completedTasks: [id, id2, id3]}
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
    } catch (e) {
      throw e;
    }
  },
};

export default storage;
