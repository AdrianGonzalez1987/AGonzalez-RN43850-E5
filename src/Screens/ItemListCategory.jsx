import { FlatList, StyleSheet, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import productsRaw from '../Data/products.json'
import ProductItem from '../Components/ProductItem'
import { colors } from '../Global/Colors'
import Search from '../Components/Search'
import Msn from '../Components/Msn'


const ItemListCategory = ({
  navigation,
  route
}) => {

  const {category} = route.params

  console.log(category);
  const [products, setProducts] = useState([])
  const [keyword, setKeyword] = useState("")
  const [keywordError, setKeywordError] = useState(" ")
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  useEffect(()=> {
    //Lógica de manejo de category
    const productsFiltered = productsRaw.filter(product => product.category === category && product.title.toLocaleLowerCase().includes(keyword.toLowerCase()))
    setProducts(productsFiltered)

  }, [category, keyword])

  const onSearch = (input) => {
    const expression = /^[a-zA-Z0-9\ ]*$/
    const evaluation = expression.test(input)
    //declaramos el modal
    

    if (evaluation) {
      setKeyword(input)
      setKeywordError("")
    } else {
      setKeywordError( <Msn />)
      setIsModalOpen(!isModalOpen)
      
      //setKeywordError(!setKeywordError)

      //console.log(setKeywordError)
    }

  }  

  return (
    <View style={styles.container}>
        <Search
          onSearch={onSearch}
          
          goBack={()=> navigation.goBack()}
        />
        <FlatList
            data = {products}
            keyExtractor={product => product.id}
            renderItem={({item}) => <ProductItem 
              item={item}
              navigation={navigation}
            />}
            showsVerticalScrollIndicator={false}
        />
        
         

             <Msn  
              
              error={keywordError}
              setIsModalOpen={setIsModalOpen}
              isModalOpen = {isModalOpen} 
          />

        
         
        
       
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
    container: {
        padding:10,
        height: '90%',
        backgroundColor: colors.beige,
        alignItems: 'center'
    },
    modalMsbPri: {
      flex: 1,
      alignContent: 'center',
      backgroundColor: '#fff',
      justifyContent: 'center'
    }
})

const onClear = () => { setKeywordError( " ")}

