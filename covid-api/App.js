import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';




export default class App extends React.Component{
 
  constructor(props){
    super(props);
    this.state ={
      isloading:false,
      error: null,
      titulos:[],
      lista:[],
    }
  }
 
  carga(pais)
  {
      return axios({
        "method":"GET",
        "url":"https://covid-19-data.p.rapidapi.com/country",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"covid-19-data.p.rapidapi.com",
        "x-rapidapi-key":"e36277b228msh7650bcd4f87129dp18296ajsn2c9a98a8b9d1",
        "useQueryString":true
      },"params":{
        "format":"json",
        "name":pais,
      }
    })
      .then((response)=>{
        // console.log(response);
        // console.log(response.data)
        let res = response["data"][0];
      
      this.setState({
        isloading:false,
        titulos: ['codigo','pais','confirmados','recuperados','muertos'],
        lista: [
          res["code"],res["country"],res["confirmed"],res["recovered"],res["deaths"]
          
        ]
      });
    })
      .catch((error)=>{
        console.log(error)
      })
    }
  
  

  componentDidMount()
  {
      this.carga("mexico");
  }
 
    render(){
      const state = this.state;
      let a=-1;
      if(state.isloading==false){
        return (
          <View style={styles.container}>
            
            <View style={styles.body}>
              <Text style={styles.titulo}>Datos del pais, por Covid-19</Text>
                  {state.lista.map(i => {
                    a=a+1;
                    return <Text>{state.titulos[a]}: {i}</Text>
                  })}
            </View>
          </View>
          );
        }else{
          return(
            <View style={styles.container}>              
              <View style={styles.body}>
                <Text>leyendo....</Text>
              </View>
            </View>
          );
          
        }
    }
}
 
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body:{
    backgroundColor: '#BAFFF1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: '55%',
  },
 
 
});
