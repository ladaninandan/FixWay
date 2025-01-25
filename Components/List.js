import React from 'react';
import { View, Text, FlatList, ScrollView, SectionList } from 'react-native';


const List = () => {

   const user = [
      {
         id: 1,
         name: 'nandan',
         data: ["php", 'java'],
      },
      {
         id: 2,
         name: 'karish',
         data: ["js", 'html'],

      },
      {
         id: 3,
         name: 'pal',
         data: ["react", 'node'],
      },
      {
         id: 4,
         name: 'darshan',
         data: ["php", 'java'],

      },
      {
         id: 5,
         name: 'nandan',
         data: ["react", 'node'],

      },
      {
         id: 6,
         name: 'karish',
         data: ["php", 'java'],

      },
      {
         id: 7,
         name: 'pal',
         data: ["php", 'java'],

      },
      {
         id: 8,
         name: 'darshan',
         data: ["php", 'java'],
      },


   ];

   return (
      <View>

         {/* using react-native flatList  */}
         <Text>FlatList use</Text>
         <FlatList
            data={user}
            renderItem={({ item }) => <Text>{item.name}</Text>}
         />

         {/* using map finction  */}
         <Text> Map function use list</Text>
         <ScrollView style={{ marginBottom: -70, marginHorizontal: 20 }}>
            {user.map((item, key) =>

               <View>
                  <Text key={key.id} style={{ backgroundColor: "lightblue", margin: 5, fontSize: 18, width: 350, padding: 9, textAlign: "center", borderRadius: 5 }}>{item.name}</Text>
               </View>
            )
            }

            {/* nested loop whith SectionList */}

            <SectionList
               sections={user} // Use an empty array if user is undefined
               renderItem={({ item }) => <Text >{item}</Text>}
               renderSectionHeader={({ section: { name } }) => (
                  <Text style={{ fontWeight: "bold" }}>{name}</Text>
               )}
            // keyExtractor={(index) => { index.id }} // Unique key for each item
            />

         </ScrollView>
      </View>
   )
}

export default List;