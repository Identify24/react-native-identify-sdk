import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Button, KeyboardAvoidingView } from 'react-native';

import {
  RTCView,
  mediaDevices,
  MediaStream,

  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
} from 'react-native-webrtc';
import { useIdentifyGlobalWebSocket } from '../../network_handler/websocket_handler/WebSocketProvider';

export const VideoRecordModule: React.FC = () => {

  function send(message: { event: string; data: any; }) {
    conn.send(JSON.stringify(message));
  }

  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [webcamStarted, setWebcamStarted] = useState(false);
  const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
  const peerConnection = new RTCPeerConnection(configuration)
  const { addMessageHandler, removeMessageHandler } = useIdentifyGlobalWebSocket();
  peerConnection.addEventListener('track', async (event) => {
    setRemoteStream(event.streams[0]);
    console.log(remoteStream)
  });

  peerConnection.addEventListener('icecandidate', event => {
    if (event.candidate) {

      send({
        event: "candidate",
        data: event.candidate
      });
    }
  });


  var conn = new WebSocket('ws://your ip address:8080/socket');//change with your ip

  useEffect(() => {
    // Mesaj işleyicisi ekle
    const handleWebSocketMessageA = async (event: { data: string; }) => {
      console.log('ComponentA:', event);
      console.log("Messaggio ricevuto:", event.data);

      // Analizza il messaggio JSON ricevuto
      const message = JSON.parse(event.data);

      if (message.event === "answer" && message.data) {
        const answer = new RTCSessionDescription(message.data);
        try {
          await peerConnection.setRemoteDescription(answer);
          console.log("Descrizione remota impostata con successo.");
        } catch (error) {
          console.log(answer)
          console.error("Errore nell'impostazione della descrizione remota:", error);
        }
      }


      // Controlla se il messaggio contiene un candidato ICE
      if (message.event === "candidate" && message.data) {
        console.log(localStream);
        // Estrai il candidato ICE dal messaggio
        const candidate = new RTCIceCandidate(message.data);

        // Aggiungi il candidato ICE al tuo peerConnection
        peerConnection.addIceCandidate(candidate)
          .then(() => {
            console.log('ICE candidate aggiunto con successo');
          })
          .catch(error => {
            console.error('Errore nell aggiungere l ICE candidate:', error);
          });
      }
      if (message.event === "offer" && message.data) {

        const offer = new RTCSessionDescription(message.data);
        await peerConnection.setRemoteDescription(offer);

        try {
          const answer = await peerConnection.createAnswer();
          console.log('Risposta creata con successo');
          console.log(answer)

          await send({
            event: "answer",
            data: answer
          });

          await peerConnection.setLocalDescription(answer);
        } catch (error) {
          console.error('Errore durante l invio della risposta al server di segnalazione');
        }

      }
    };

    addMessageHandler(handleWebSocketMessageA);

    // Temizleme fonksiyonu

    return () => {
      // Mesaj işleyicisini kaldır
      removeMessageHandler(handleWebSocketMessageA);
    };

  }, [addMessageHandler]);

 

  const startWebcam = async () => {

    try {
      const stream = await mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setWebcamStarted(true);
      setLocalStream(stream);

      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    } catch (error) {
      console.error('Errore durante l invio della risposta al server di segnalazione');
    }

    const offer = await peerConnection.createOffer({});
    //console.log('offer',offer)
    await peerConnection.setLocalDescription(offer);

    send({
      event: "offer",
      data: peerConnection.localDescription
    });

  }

  return (
    <KeyboardAvoidingView style={styles.body} behavior="position">
      <SafeAreaView>
        <RTCView
          streamURL={remoteStream?.toURL()}
          style={styles.stream}
          objectFit="cover"
          mirror
        />
        <View style={styles.buttons}>
          {!webcamStarted && (
            <Button title="Start webcam" onPress={startWebcam} />
          )}
          {webcamStarted && (
            <Button title="Stop webcam" onPress={() => setLocalStream(undefined)} />
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = {
  body: {
    flex: 1,

  },
  stream: {
    height: 300,
  },
  buttons: {
    marginTop: 20,
  },
};
