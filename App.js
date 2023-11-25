import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Main from './Components/Main';
import AllCalendar from './Components/AllCalendar';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('Diary');

  const renderTab = (tabName, iconName) => (
    <TouchableOpacity
      key={tabName}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: selectedTab === tabName ? 'tomato' : 'white' }}
      onPress={() => setSelectedTab(tabName)}>
      <Text style={{ color: selectedTab === tabName ? 'white' : 'black' }}>{iconName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ top: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {selectedTab === 'Diary' && <Main />}
        {selectedTab === 'AllCalendar' && <AllCalendar />}
        {/* Add other screens similarly */}
      </View>
      <View style={{ flexDirection: 'row', height: 50 }}>
        {renderTab('Diary', '📖')}
        {renderTab('AllCalendar', '🗓️')}
        {/* Add other tabs similarly */}
      </View>
    </View>
  );
};

export default App;
