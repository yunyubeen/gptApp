import React from 'react';
import { View, Text } from 'react-native';

const ReadDiary = ({ entry }) => (
  <View style={{margin:15,top:30}}>
    <Text>일기: ID {entry.id}</Text>
    <Text>날짜 :{entry.date}</Text>
    <Text>제목: {entry.title}</Text>
    <Text>내용: {entry.content}</Text>
  </View>
);

export default ReadDiary;
