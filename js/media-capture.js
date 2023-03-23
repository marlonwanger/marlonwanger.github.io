// window.addEventListener("DOMContentLoaded", startVideoFromCamera);
// document.getElementById("play").addEventListener("click", ()=>{})

const cameraOptions = document.querySelector('.video-options>select');
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const screenshotImage = document.querySelector('img');
const buttons = document.querySelectorAll('button');
let streamStarted = false;
const [play, pause, turnoff, flip, record, pip, playvideo, downloadvideo, stoprecord, backtonormal] = buttons;

let front = true;
let paused = false;
let mediaRecorder;
let recordedBlobs;

const constraints = {
  video: {
    facingMode: front ? "user" : "environment",
    width: {
      min: 1280,
      max: 2560,
    },
    height: {
      min: 720,
      max: 1440
    },
  },
};

const getCameraSelection = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  console.log(videoDevices)
  const options = videoDevices.map(videoDevice => {
    return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
  });
  cameraOptions.innerHTML = options.join('');
};

const GetMediaStreamTracks = () => {
  const mediaStream = video.srcObject;
 return mediaStream.getTracks();
}

const PauseAndPlayStream = (paused) => {
  var tracks = GetMediaStreamTracks();
  tracks[0].enabled = paused;
}

const startStream = async (constraints) => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  handleStream(stream);
};

const handleStream = (stream) => {
  video.srcObject = stream;
  window.stream = stream;
  play.classList.add('hide');
  pause.classList.remove('hide');
  record.classList.remove('hide');
  flip.classList.remove('hide');
  turnoff.classList.remove('hide');
  pip.classList.remove('hide');
  record.classList.remove('hide');
  streamStarted = true;
};

play.onclick = () => {
  if(streamStarted) {
    if(paused) {
      PauseAndPlayStream(true);
      paused = false;
    }
    else
    {
      video.play();
    }
    play.classList.add('hide'),
    pause.classList.remove('hide');
    return;
  }

  if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
    const updatedConstraints = {
      ...constraints,
      deviceId: {
        exact: cameraOptions.value
      }
    };
    startStream(constraints);
  }
}

flip.onclick = () => {
  front = !front;
  const updatedConstraints = {
    ...constraints
  }
  updatedConstraints.video.facingMode = front ? "user" : "environment",
  startStream(updatedConstraints);
}

pause.onclick = () => {
  video.pause;
  play.classList.remove('hide');
  pause.classList.add('hide');

  PauseAndPlayStream(false);
  paused = true;
}

turnoff.onclick = () => {
  const tracks = GetMediaStreamTracks();
  tracks[0].stop();

  play.classList.remove('hide');
  pause.classList.add('hide');
  record.classList.add('hide');
  flip.classList.add('hide');
  turnoff.classList.add('hide');
  pip.classList.add('hide');
  streamStarted = false;
}

pip.onclick = () => {
  video.requestPictureInPicture();
}

record.onclick = () => {
  startRecording();
}

stoprecord.onclick = () => {
  stopRecording();
}

downloadvideo.onclick = () => {
  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}

backtonormal.onclick = () => {
  pause.classList.remove('hide');
  record.classList.remove('hide');
  flip.classList.remove('hide');
  turnoff.classList.remove('hide');
  pip.classList.remove('hide');
  record.classList.remove('hide');

  playvideo.classList.add('hide');
  downloadvideo.classList.add('hide');
  backtonormal.classList.add('hide');

}

const startRecording = () => {
console.log(buttons);
  play.classList.add('hide');
  pause.classList.add('hide');
  record.classList.add('hide');
  flip.classList.add('hide');
  turnoff.classList.add('hide');
  pip.classList.add('hide');
  stoprecord.classList.remove('hide');
  // playvideo.classList.remove('hide');
  // downloadvideo.classList.remove('hide');
  // backtonormal.classList.remove('hide');

  console.log('aew');
  recordedBlobs = [];
  const mimeType = "video/webm;codecs=vp9,opus";
  const options = {mimeType};

  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error('Exception while creating MediaRecorder:', e);
    return;
  }

  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
    console.log('Recorded Blobs: ', recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log('MediaRecorder started', mediaRecorder);

};

const stopRecording = () => {

  stoprecord.classList.add('hide');
  record.classList.remove('hide');
  playvideo.classList.remove('hide');
  downloadvideo.classList.remove('hide');
  backtonormal.classList.remove('hide');

  mediaRecorder.stop();
};

function handleDataAvailable(event) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}


getCameraSelection();