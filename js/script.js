$(document).ready(function(){
    var video = document.querySelector("#cam");
    var mediaConfig =  { video: {
        width: $(window).width(),
        height: $(window).height(),
    } };
    var current_camera = "";
    var camera_type = "front";
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
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("enumerateDevices is not supported.");
        alert("enumerateDevices is not supported.")
    }else{
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            console.log(devices.filter(device => device.kind == "videoinput").length);
            if(devices.filter(device => device.kind == "videoinput").length == 1){
                $("#switch-camera").css("display", "none");
            }
        })
        
    }

    $("#switch-camera").click(function(){
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            console.log("enumerateDevices is not supported.");
            alert("enumerateDevices is not supported.")
        }else{
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                var isChanged = false;
                if(camera_type == "front"){
                    camera_type = "back";
                }else{
                    camera_type = "front";
                }
                devices.forEach((device) => {
                    let option = new Option();
                    option.value = device.deviceId;
                    
                    // According to the type of media device
                    switch(device.kind){
                        // Append device to list of Cameras
                        case "videoinput":
                            if(device.label.indexOf(camera_type) >= 0){
                                if(!isChanged){
                                    console.log("select " + device);
                                    mediaConfig.video.deviceId = {
                                        exact: device.deviceId
                                    }
                                    setCamera(mediaConfig)
                                    isChanged = true;
                                }
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