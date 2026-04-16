import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { database } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";

export default function DeviceStatus() {
  const [status, setStatus] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const statusRef = ref(database, "device/status");
    const unsubscribeStatus = onValue(statusRef, (snapshot) => {
      setStatus(snapshot.val());
    });

    const logsRef = ref(database, "device/logs");
    const unsubscribeLogs = onValue(logsRef, (snapshot) => {
      const logsArr = [];
      snapshot.forEach(child => logsArr.push(child.val()));
      setLogs(logsArr.reverse());
    });

    return () => {
      unsubscribeStatus();
      unsubscribeLogs();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Device Status</Text>
      <Text>Status: <Text style={styles.bold}>{status ? status : "Loading..."}</Text></Text>
      <Text style={styles.heading}>Logs</Text>
      <FlatList
        data={logs}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <Text style={styles.logItem}>{item}</Text>}
        ListEmptyComponent={<Text>No logs found.</Text>}
        style={styles.logList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  logList: {
    width: '100%',
    maxHeight: 200,
  },
  logItem: {
    fontSize: 14,
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
