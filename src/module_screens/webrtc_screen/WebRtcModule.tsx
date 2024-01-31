import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Button, KeyboardAvoidingView } from 'react-native';
import { StackActions } from '@react-navigation/native';
import {
  RTCView,
  mediaDevices,
  MediaStream,

  RTCPeerConnection,
  MediaStreamTrack,
  RTCSessionDescription,
  RTCIceCandidate,
} from 'react-native-webrtc';
import { WebSocketMessageHandler, useIdentifyGlobalWebSocket } from '../../network_handler/websocket_handler/WebSocketProvider';
import { useIdentifySdkContext } from '../../general_handler/IdentfiyGeneralProvider';
import { NavigateProp } from '../../module_interfaces/IdentifyOptions';
import { IdentifyModuleTypes } from '../../enums/identify_module_types';


export const WebRTCModule: React.FC<NavigateProp> = ({ navigation }: NavigateProp) => {
  const { webRTCInfo, userDetails } = useIdentifySdkContext();
  const { sendMessage, addMessageHandler, removeMessageHandler } = useIdentifyGlobalWebSocket();


  const peerConnection = useRef<RTCPeerConnection | null>(null);

  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [localStream, setLocalStream] = useState<MediaStream>();


  useEffect(() => {
    const configuration = {
      iceServers: [{
        urls: [webRTCInfo.stun + ":" + webRTCInfo.stunPort, webRTCInfo.turn + ":" + webRTCInfo.turnPort],
        username: webRTCInfo.turnUsername,
        credential: webRTCInfo.turnPassword,
      }]
    };


    peerConnection.current = new RTCPeerConnection(configuration);

    return () => {

      peerConnection.current?.close();

    }
  }, []);
  const trackHandler = async (event: { streams: React.SetStateAction<MediaStream | undefined>[]; }) => {
    setRemoteStream(event.streams[0]);
  };

  const iceCandidateHandler = (event: { candidate: any; }) => {
    if (event.candidate) {
      sendMessage(JSON.stringify({
        "action": "candidate",
        "room": userDetails?.customer_uid,
        "candidate": event.candidate,
      }));
    }
  };
  useEffect(() => {
    try {


      peerConnection.current!!.addEventListener('track', trackHandler);

      peerConnection.current!!.addEventListener('icecandidate', iceCandidateHandler);

    } catch (e) {
      console.error("Listener Error:", e);
    }

    return () => {
      peerConnection.current?.removeEventListener("track", trackHandler);
      peerConnection.current?.removeEventListener("icecandidate", iceCandidateHandler);
    }
  }, []);

  const handleSocketEvents = (event: WebSocketMessageHandler) => {
    try {
      if (event) {
        const socketActionData = JSON.parse(JSON.stringify(event));
        console.log("socketActionData:", socketActionData);

        const fetchData = async () => {

          if (socketActionData["action"] === "sdp" && socketActionData["sdp"]["type"] === "answer" && socketActionData["sdp"]) {

            const answer = new RTCSessionDescription({
              sdp: socketActionData["sdp"]["sdp"],
              type: "answer",
            });

            try {

              await peerConnection.current!!.setRemoteDescription(answer);



            } catch (error) {

              console.error("Error setting remote description:", error);
            }
          }


          // Check if the message contains an ICE candidate
          if (socketActionData["action"] === "candidate" && socketActionData["candidate"]["candidate"]) {

            // Extract the ICE candidate from the message
            const candidate = new RTCIceCandidate({
              candidate: socketActionData["candidate"]["candidate"],
              sdpMid: socketActionData["candidate"]["sdpMid"],
              sdpMLineIndex: socketActionData["candidate"]["sdpMLineIndex"],
            });

            // Add the ICE candidate to your peerConnection
            await peerConnection.current!!.addIceCandidate(candidate)
              .then(() => {
                console.log('ICE candidate added successfully');
              })
              .catch(error => {
                console.error('Error adding ICE candidate:', error);
              });
          }
        }
        fetchData()

        if (socketActionData["action"] === "terminateCall") {
          const popAction = StackActions.popToTop()
          navigation.dispatch(popAction);
          navigation.navigate(IdentifyModuleTypes.THANK_YOU_MODULE)
        }
      }
    } catch (e) {
      console.error("Error", e);
    }
  }


  useEffect(() => {
    addMessageHandler(handleSocketEvents);
    return () => {
      removeMessageHandler(handleSocketEvents);
    };
  }, [addMessageHandler]);

  useEffect(() => {
    startWebcam();
    return () => {
      localStream?.release()
      setLocalStream(undefined)
    };
  }, []);
  
  const startWebcam = useCallback(async () => {

    try {
      const stream = await mediaDevices.getUserMedia({
        video: true,
        audio: true,

      });
      setLocalStream(stream);

      stream.getTracks().forEach(track => peerConnection.current!!.addTrack(track, stream));
    } catch (error) {
      console.error('Error sending response to reporting server');
    }

    const offer = await peerConnection.current!!.createOffer({});

    await peerConnection.current!!.setLocalDescription(offer);

    sendMessage(JSON.stringify({
      "action": "startCall",
      "room": userDetails?.customer_uid,
    }))

    sendMessage(JSON.stringify({
      "action": "sdp",
      "room": userDetails?.customer_uid,
      "sdp": peerConnection.current!!.localDescription
    }));

  }, [])

  return (
    <KeyboardAvoidingView style={styles.body} behavior="position">
      <SafeAreaView>
        <RTCView
          streamURL={remoteStream?.toURL()}
          style={styles.stream}
          objectFit="cover"
          mirror
        />
        <RTCView
          streamURL={localStream?.toURL()}
          style={styles.stream}
          objectFit="cover"
          mirror
        />

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
