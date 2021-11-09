import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Modal, Pressable } from 'react-native';

export default function App() {

  let {main, container, body, pad, title, timestamp, done, notDone} = style

  const [ almacen, setAlmacen ] = useState([])
  const [ task, setTask ] = useState('')
  const [ counter, setCounter ] = useState(0)
  const [ modifyModalVisible, setModifyModalVisible ] = useState(false)
  const [ removeModalVisible, setRemoveModalVisible ] = useState(false)
  const [ toBeModified, setToBeModified ] = useState()
  const [ newContent, setNewContent ] = useState('')

  const handleInputText = (value)=>{
    setTask(value)
  }
  const handleInputTextClick = ()=>{
    if(task.length !== 0){
      setAlmacen([
        ...almacen,
        { 
          content: task, 
          id: counter, 
          completed:false, 
          timestamp:`${new Date().toLocaleDateString("es-ES").toString()}\n ${new Date().toLocaleTimeString()}` }
      ])
      setTask('')
      setCounter(counter+1)
    }
  }

  const handleDeleteItem = (id) => {
    setRemoveModalVisible(true)
    setToBeModified(id)
  }

  const deleteItem = (id) => {
    let arrWithoutItem = almacen.filter(e => e.id != id)
    setAlmacen([
      ...arrWithoutItem
    ])
    setRemoveModalVisible(false)
  }

  const handleModifyItem = (id)=>{
    setModifyModalVisible(true)
    setToBeModified(id)
  }
  
  const modifyItem = (id, newContent) =>{
    const updatedItemList = almacen.map(elem=> {
      if(elem.id == id){
        return {
          ...elem,
          content: newContent
        }
      }
      return elem
    })
    setAlmacen([...updatedItemList])
    setNewContent('')
    setModifyModalVisible(false)
  }

  const handleCompletedItem = (id)=> {
    const updatedItemList = almacen.map(elem=> {
      if(elem.id == id){
        return {
          ...elem,
          completed: !elem.completed
        }
      }
      return elem
    })
    setAlmacen([...updatedItemList])
  }

  return (
    <View style={body}>
      <View style={main}>

        <Text style={title}>TO DO LIST</Text>

        <View style={container}>
          <TextInput
          multiline={true}
          placeholder="Ingrese tarea"
          value={task}
          onChangeText={handleInputText}
          />
          <Button title="ADD" onPress={handleInputTextClick}></Button>
        </View>
        
        <View style={main}> 
          <FlatList
          data={almacen}
          keyExtractor={e => e.id}
          extraData={almacen}
          renderItem={({ item }) => (
            <View style={container}>
                <View>
                  <Text  multiline={true}> {item.content} </Text>
                  <Text style={timestamp}> {item.timestamp} </Text>
                </View>

                <View style={pad}>
                  <Pressable onPress={()=>handleCompletedItem(item.id)} style={item.completed ? done : notDone }>
                    <Text> {item.completed ? 'DONE' : 'UNDONE'} </Text>
                  </Pressable>
                  <Button onPress={()=>handleModifyItem(item.id)} title="EDIT"></Button>
                  <Button onPress={()=>handleDeleteItem(item.id)} title="X"></Button>
                </View>
            </View>
            )}
          />
        </View>

        <Modal visible={removeModalVisible}>
                <Text> Quieres remover este item? </Text>
                <Button
                title="SI"
                onPress={()=> deleteItem(toBeModified)}>
                </Button>
                <Button 
                title="NO, VOLVER"
                onPress={()=> setRemoveModalVisible(false)}>
                </Button>
        </Modal>
        <Modal visible={modifyModalVisible}>
                <Text> Quieres modificarlo? </Text>
                <TextInput
                multiline={true}
                placeholder="Modifica la tarea..."
                onChangeText={(value)=>setNewContent(value)}
                value={newContent}
                />
                <Button
                title="MODIFICAR"
                onPress={()=> modifyItem(toBeModified, newContent)}>
                </Button>
                <Button 
                title="CERRAR"
                onPress={()=> setModifyModalVisible(false)}>
                </Button>
        </Modal>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  body:{
    flex:1,
    backgroundColor: "lightblue",
    alignItems:"center"
  },
  main:{
    marginTop:100,
    width:"100%",
    flex:1
  },
  container:{
    flexDirection: "row",
    borderWidth: 2,
    borderRadius:10,
    padding:5,
    borderColor:"#CFF1FF",
    justifyContent:"space-between",
    width:"100%",
    alignItems:"center",
    backgroundColor:"#CFFFF2"
  },
  subContainer:{
    width:"100%"
  },
  pad:{
    flexDirection:"row",
    justifyContent:'space-around'
  },
  title:{
    fontSize:25
  },
  timestamp:{
    color:"#7D9F96"
  },
  done:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
  },
  notDone: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
  },
});
