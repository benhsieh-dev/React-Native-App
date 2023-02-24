import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisable, setModalIsVisable] = useState(false); 
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisable(true); 
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, {text: enteredGoalText, id: Math.random().toString()}]); 
    endAddGoaldHadler(); 
  };

  function endAddGoaldHadler() {
    setModalIsVisable(false); 
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    }); 
  }

  return (
    <>
    <StatusBar style="light" />
    <View style={styles.appContainer}>
      <Button title="Add New Goal" color="#a065ec" onPress={startAddGoalHandler} />
      <GoalInput visible={modalIsVisable} onAddGoal={addGoalHandler} onCancel={endAddGoaldHadler} />
      <View style={styles.goalsContainer}>
        <FlatList 
          data={courseGoals} 
          renderItem={(itemData) => {
            return <GoalItem 
                      text={itemData.item.text} 
                      id={itemData.item.id}
                      onDeleteItem={deleteGoalHandler} />
          }}    
          keyExtractor={(item, index) => {
            return item.id; 
          }}
          alwaysBounceVertical={false} 
        
        /> 
     
      </View> 
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5
  }
});
