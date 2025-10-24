import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import Constants from 'expo-constants';

const apiBase = (Constants.expoConfig?.extra as any)?.ASSISTANT_API_BASE || 'http://localhost:3000/api';

type Msg = { role: 'user' | 'assistant'; text: string };

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const cameraRef = useRef<Camera | null>(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  async function captureAndAnalyze() {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.8 });
    const base64 = photo.base64 || '';
    setMessages((m) => [...m, { role: 'user', text: '📸' }]);
    const res = await fetch(`${apiBase}/vision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: base64, text: input })
    });
    const data = await res.json();
    const reply = data.text || '';
    setMessages((m) => [...m, { role: 'assistant', text: reply }]);
    Speech.speak(reply, { language: 'ar' });
  }

  async function sendText() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    const res = await fetch(`${apiBase}/chat`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    const reply = data.text || '';
    setMessages((m) => [...m, { role: 'assistant', text: reply }]);
    Speech.speak(reply);
  }

  async function recordAndTranscribe() {
    if (recording) return;
    setRecording(true);
    const { granted } = await Audio.requestPermissionsAsync();
    if (!granted) { setRecording(false); return; }

    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const rec = new Audio.Recording();
    await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    await rec.startAsync();

    setTimeout(async () => {
      await rec.stopAndUnloadAsync();
      const uri = rec.getURI();
      if (!uri) { setRecording(false); return; }
      const file = await fetch(uri);
      const blob = await file.blob();
      const b64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1] ?? '');
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      const res = await fetch(`${apiBase}/transcribe`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64: b64, mimeType: blob.type || 'audio/webm' })
      });
      const data = await res.json();
      const text: string = data.text || '';
      if (text) {
        setMessages((m) => [...m, { role: 'user', text }]);
        const chatRes = await fetch(`${apiBase}/chat`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });
        const chatData = await chatRes.json();
        const reply = chatData.text || '';
        setMessages((m) => [...m, { role: 'assistant', text: reply }]);
        Speech.speak(reply);
      }
      setRecording(false);
    }, 5000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Smart AI Vision Assistant</Text>
      <View style={styles.cameraBox}>
        {permission?.granted ? (
          <Camera ref={cameraRef} style={StyleSheet.absoluteFill} type={CameraType.back} />
        ) : (
          <View style={styles.center}><Text style={styles.dim}>Camera permission required</Text></View>
        )}
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.button} onPress={captureAndAnalyze}><Text>📸 Analyze</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, recording && styles.buttonRec]} onPress={recordAndTranscribe}><Text>🎙️ Voice</Text></TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(_, i) => `m-${i}`}
        style={styles.messages}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.role === 'user' ? styles.user : styles.assistant]}>
            <Text style={item.role === 'user' ? styles.userText : styles.assistantText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
          placeholderTextColor="#999"
          style={styles.input}
        />
        <TouchableOpacity style={styles.send} onPress={sendText}><Text style={{ color: 'white' }}>Send</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  title: { color: '#fff', fontSize: 18, fontWeight: '600', padding: 16 },
  cameraBox: { height: 220, borderRadius: 16, marginHorizontal: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#27272a' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dim: { color: '#a1a1aa' },
  controlsRow: { position: 'absolute', bottom: 8, left: 8, right: 8, flexDirection: 'row', gap: 8 },
  button: { backgroundColor: '#4f46e5', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10 },
  buttonRec: { backgroundColor: '#dc2626' },
  messages: { flex: 1, marginTop: 16, marginHorizontal: 16 },
  bubble: { maxWidth: '80%', padding: 10, marginBottom: 8, borderRadius: 16 },
  user: { alignSelf: 'flex-end', backgroundColor: '#2563eb' },
  assistant: { alignSelf: 'flex-start', backgroundColor: '#18181b' },
  userText: { color: '#fff' },
  assistantText: { color: '#e4e4e7' },
  inputRow: { flexDirection: 'row', gap: 8, padding: 16 },
  input: { flex: 1, backgroundColor: '#0b0b0b', borderColor: '#27272a', borderWidth: 1, color: '#fff', borderRadius: 12, paddingHorizontal: 12, height: 44 },
  send: { backgroundColor: '#4f46e5', height: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, borderRadius: 12 }
});
