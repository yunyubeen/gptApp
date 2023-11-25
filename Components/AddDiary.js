import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, Text, StyleSheet, TouchableWithoutFeedback, Keyboard,Alert  } from 'react-native';
import { chat } from '../openai';

const AddDiary = ({ entries, setEntries, goPage }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(getDate());
  const [result, setResult] = useState("");

  function getDate() {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  }

  const handleAddDiary = () => {
    const id = entries.length !== 0 ? entries[entries.length - 1].id + 1 : 1;
    setEntries([...entries, { id, title, content, date }]);

    const userPrompt = `당신은 사용자가 쓴 일기를 바탕으로 사용자에게 도움이 되는 내용을 한 줄로 간단하게 이야기해주세요.
    (위로를 해준다거나 사용자가 필요로할 만한 정보를 알려준다거나 추천해주는듯한 내용을 작성해주세요.
      사용자의 일기 내용: 
      제목 : ${title} 
      내용 : ${content} )`;
    chat(userPrompt, (result) => setResult(result));
    
    setDate(getDate());
    Alert.alert('알림', `${title}일기가 추가되었습니다.`, [{ text: '확인' }]);

  };

const handleBlur = () => {
    Keyboard.dismiss(); // 키보드 감춤
  };

  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text>일기 추가</Text>
          <TextInput
            style={styles.dateInput}
            value={date}
            onChangeText={(value) => setDate(value)}
            placeholder="날짜 (YYYY-MM-DD):"
          />
        </View>
        <TextInput
          style={styles.titleInput}
          onChangeText={(value) => setTitle(value)}
          value={title}
          placeholder="제목"
        />
        <ScrollView style={styles.contentInputContainer}>
          <TextInput
            style={styles.contentInput}
            onChangeText={(value) => setContent(value)}
            value={content}
            placeholder="내용"
            multiline
            numberOfLines={10}
          />
        </ScrollView>

        <Button title="추가" onPress={handleAddDiary} />
        <Text style={styles.resultText}>AI의 한마디: {result}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
    top: 60,
  },
  inputContainer: {
    marginBottom: 20,
    borderBottomWidth: 1, // 윤곽선 추가
    paddingBottom: 10,
  },
  dateInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  titleInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  contentInputContainer: {
    height: 200,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  contentInput: {
    flex: 1,
  },
  resultText: {
    marginTop: 10,
  },
});

export default AddDiary;
