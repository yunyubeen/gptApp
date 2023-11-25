import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const DiaryList = ({ entries, goPage }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [diariesForSelectedDate, setDiariesForSelectedDate] = useState([]);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    // 해당 날짜에 해당하는 모든 일기를 찾아서 불러올 수 있음
    const diariesForSelectedDate = entries.filter((entry) => entry.date === day.dateString);

    setDiariesForSelectedDate(diariesForSelectedDate);
  };

  return (
    <View style={{ margin: 15, top: 30 }}>
      <Calendar
        theme={{
          arrowColor: 'tomato',
          todayTextColor: 'orange',
          selectedDayBackgroundColor: 'blue',
        }}
        onDayPress={onDayPress}
      />
      <View style={{ margin: 10, top: 30 }}>
        <Text style={{fontSize:18}}>선택된 날짜: {selectedDate}</Text>
        {/* 선택된 날짜에 해당하는 일기 목록 표시함 */}
        {diariesForSelectedDate.map((diary) => (
          <View style={{ flexDirection: 'row', marginBottom: 10 }} key={diary.id}>
            <Text style={{fontSize:18}}>○ {diary.title}</Text>
            <TouchableOpacity onPress={() => goPage('Read', { id: diary.id })} style={{ marginLeft: 10, marginTop:3 }}>
              <Text style={{ color: 'tomato' }}>Read</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DiaryList;
