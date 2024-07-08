import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BookTable({ route }) {
  const [diners, setDiners] = useState(2);
  const [kids, setKids] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { restaurantName } = route.params || { restaurantName: 'Restaurant Name' }; // Replace with dynamic restaurant name

  const timeSlots = [];
  for (let hour = 7; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      let period = hour >= 12 ? 'PM' : 'AM';
      let displayHour = hour > 12 ? hour - 12 : hour;
      if (displayHour === 0) displayHour = 12;
      let displayMinute = minute === 0 ? '00' : minute;
      timeSlots.push(`${displayHour}:${displayMinute} ${period}`);
    }
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onBookTable = () => {
    console.log(`Diners: ${diners}, Kids: ${kids}, Time: ${selectedTime}, Date: ${date.toDateString()}`);
    // Implement your table booking logic here
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book A Table</Text>
      <Text style={styles.subTitle}>{restaurantName}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>How many diners? (Adults)</Text>
        <View style={styles.dinerCount}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setDiners(diners > 1 ? diners - 1 : 1)}
          >
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.dinerNumber}>{diners} People</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setDiners(diners + 1)}
          >
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Kids</Text>
        <View style={styles.dinerCount}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setKids(kids > 0 ? kids - 1 : 0)}
          >
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.dinerNumber}>{kids} Kids</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setKids(kids + 1)}
          >
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Select Time</Text>
        <ScrollView horizontal contentContainerStyle={styles.timeSlotsContainer}>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeSlot,
                selectedTime === time && styles.selectedTimeSlot,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Reservation Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="calendar"
            onChange={onDateChange}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={onBookTable}
      >
        <Text style={styles.bookButtonText}>Book Table</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ff3131',
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#888',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  dinerCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff3131',
    borderRadius: 20,
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  dinerNumber: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
  },
  timeSlot: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedTimeSlot: {
    backgroundColor: '#ff3131',
  },
  timeText: {
    fontSize: 16,
    color: '#444',
  },
  selectedTimeText: {
    color: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#ff3131',
    textAlign: 'center',
  },
  bookButton: {
    backgroundColor: '#ff3131',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
