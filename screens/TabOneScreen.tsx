import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Task } from '../components/Task';
import { RootTabScreenProps } from '../types';
import { useState } from 'react';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [task, setTask] = useState<string>('');
  const [taskItems, setTaskItems] = useState<string[]>([]);

  const handleAddTask = () => {
    console.log(task);
    setTaskItems([...taskItems, task]);
    setTask('');
  }

  const completeTask = (index: number) => {
    const itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
    {/* Added this scroll view to enable scrolling when list gets longer than the page */}
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{
        flexGrow: 1
      }}
      keyboardShouldPersistTaps='handled'
    >
        <Text style={styles.title}>Today's tasks</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.items}>
        {taskItems?.map((task, index) => {
          return <TouchableOpacity onPress={() => completeTask(index)}>
           <Task key={index} text={task}></Task>
          </TouchableOpacity>
          })}
        </View>
      </ScrollView>

      
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ?  'padding' : 'height'}
      style={styles.taskFormWrapper}>
        <TextInput style={styles.input} placeholder='Write a task' 
        onChangeText={text => setTask(text)} value={task}></TextInput>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    padding: 15,
    fontWeight: 'bold',
  },
  scrollView: {
    marginBottom: 80
  },
  separator: {
    marginVertical: 5,
    height: 1,
  },
  items: {
    margin: 5
  },
  taskFormWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    borderRadius: 60,
    backgroundColor: '#FFF',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {

  }
});
