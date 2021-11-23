$(document).ready(function(){
    var video = document.querySelector("#cam");
    var mediaConfig =  { video: true };
    var current_camera = "";
    if($("#cam").length){
        setCamera(mediaConfig);
    }
    

    function setCamera(mediaConfig){
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
                // video.src = window.URL.createObjectURL(stream);
                video.srcObject = stream;
                video.play();
            }, errBack);
        }

        else if(navigator.getUserMedia) { // Standard
            navigator.getUserMedia(mediaConfig, function(stream) {
                video.src = stream;
                video.play();
            }, errBack);
        } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia(mediaConfig, function(stream){
                video.src = window.webkitURL.createObjectURL(stream);
                video.play();
            }, errBack);
        } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
            navigator.mozGetUserMedia(mediaConfig, function(stream){
                video.src = window.URL.createObjectURL(stream);
                video.play();
            }, errBack);
        }else{
            //video.src = base_url+"/video/test_mp4.mp4";
        }
    }
    function errBack(){
        console.log("error")
    }

    $(".switch-camera").click(function(){
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            console.log("enumerateDevices is not supported.");
        }else{
            navigator.mediaDevices.enumerateDevices().then((devices) => {
               
                
                devices.forEach((device) => {
                    let option = new Option();
                    option.value = device.deviceId;
            
                    // According to the type of media device
                    switch(device.kind){
                        // Append device to list of Cameras
                        case "videoinput":
                            if(device.deviceId != current_camera){
                                console.log("select " + device);
                                mediaConfig.video = {
                                    deviceId: device.deviceId
                                }
                                navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
                                    // video.src = window.URL.createObjectURL(stream);
                                    video.srcObject = stream;
                                    video.play();
                                }, errBack);
                            }
                            break;
                    }
            
                    console.log(device);
                });
            }).catch(function (e) {
                console.log(e.name + ": " + e.message);
            });
        }
    })
});