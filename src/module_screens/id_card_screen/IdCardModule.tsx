import * as React from 'react'
import { View } from 'react-native'
// import { useTensorflowModel } from 'react-native-fast-tflite'
// import { Camera, useCameraDevice, useFrameProcessor } from 'react-native-vision-camera'

export const IdCardScan: React.FC = () => {
    //   const model = useTensorflowModel(require('/Users/furkanguney/AwesomeProjectsr/src/assets/model.tflite'))
    //   const device = useCameraDevice("back")
    //   const frameProcessor = useFrameProcessor((frame) => {
    //     'worklet'
    //
    //     if (model.state !== "loaded") return
    //     const data = frame.toArrayBuffer()
    //     // do RGB conversion if the Frame is not already in RGB Format
    //     const outputs = model.model.runSync([data])
    // 
    //     const detection_boxes = outputs[0]
    //     const detection_classes = outputs[1]
    //     const detection_scores = outputs[2]
    //     const num_detections = outputs[3]
    //     console.log(`Detected ${num_detections[0]} objects!`)
    // 
    //     for (let i = 0; i < detection_boxes.length; i += 4) {
    //         const confidence = detection_scores[i / 4]
    //         if (confidence > 0.7) {
    //             // Draw a red box around the object!
    //             const left = detection_boxes[i]
    //             const top = detection_boxes[i + 1]
    //             const right = detection_boxes[i + 2]
    //             const bottom = detection_boxes[i + 3]
    //   
    //         }
    //     }
    // }, [ ])
    return (
        <View></View>)
    //<Camera frameProcessor={frameProcessor} style={styles.cameraContainer} isActive={true} device={device!} />)
}
