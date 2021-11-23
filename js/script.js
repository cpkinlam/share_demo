$(document).ready(function(){
    var video = document.querySelector("#cam");
   
    var current_camera = "";
    var facingMode = "environment";
    var mediaConfig =  { video: { facingMode:  facingMode} };
    if($("#cam").length){
        setCamera(mediaConfig);
    }
    

    function setCamera(mediaConfig){
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
                // video.src = window.URL.createObjectURL(stream);
                videoElm.srcObject = null;
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
        const supports = navigator.mediaDevices.getSupportedConstraints();
        if (!supports['facingMode']) {
            $("#switch-camera").css("display", "none");
        }
        
    }

    $("#switch-camera").click(function(){
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            console.log("enumerateDevices is not supported.");
            alert("enumerateDevices is not supported.")
        }else{
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                var isChanged = false;
                if(facingMode == "environment"){
                    facingMode = "user";
                }else{
                    facingMode = "environment";
                }
                mediaConfig.video =  { facingMode: facingMode} ;
                setCamera(mediaConfig)
                
            }).catch(function (e) {
                console.log(e.name + ": " + e.message);
            });
        }
    })
});