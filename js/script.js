var home_url = "https://www.awe-winter.link/";

var img_dir = "https://cpkinlam.github.io/share_demo/images/"
$(document).ready(function(){
    var video = document.querySelector("#cam");

    if(window.location.hash) {
        hash_id = location.href.split('#')[1];

        $(".animation-item1").prepend('<img src="'+img_dir+'animation'+hash_id+'_bottom.gif'+'" />')
    }

    /****************** index ***********/
    $(".temp-wrap").click(function(){
        var this_id = $(this).attr("data-id");
        window.location='./camera.html#'+this_id;
    })





    var current_camera = "";
    var facingMode = "environment";
    var mediaConfig =  {
        video: {
            width: {
                min: $(".camera-wrap").width(),
                ideal: $(".camera-wrap").width(),
                max: $(".camera-wrap").width(),
                exact: $(".camera-wrap").width()
            },
            height: { 
                min: $(".camera-wrap").height(),
                ideal: $(".camera-wrap").height(),
                max: $(".camera-wrap").height() },
                exact: $(".camera-wrap").height()
        }
    };
    if($("#cam").length){
        setCamera(mediaConfig);
    }
    

    function setCamera(mediaConfig){
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
                // video.src = window.URL.createObjectURL(stream);
                video.srcObject = null;
                video.srcObject = stream;
                video.play();
            }, errBack());
        }

        else if(navigator.getUserMedia) { // Standard
            navigator.getUserMedia(mediaConfig, function(stream) {
                video.src = stream;
                video.play();
            }, errBack());
        } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia(mediaConfig, function(stream){
                video.src = window.webkitURL.createObjectURL(stream);
                video.play();
            }, errBack());
        } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
            navigator.mozGetUserMedia(mediaConfig, function(stream){
                video.src = window.URL.createObjectURL(stream);
                video.play();
            }, errBack());
        }else{
            //video.src = base_url+"/video/test_mp4.mp4";
        }
    }
    function errBack(){
        console.log("errBack")
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("enumerateDevices is not supported.");
        alert("enumerateDevices is not supported.")
    }else{
        const supports = navigator.mediaDevices.getSupportedConstraints();
        if (!supports['facingMode']) {
            $("#switch-camera-btn").css("display", "none");
        }
        
    }

    $("#switch-camera-btn").click(function(){
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


    $(".take-photo-btn").click(function(){
        var win_w_scale	= $(".camera-wrap").width();
		var win_h_scale	= $(".camera-wrap").height();
        var img = new Image;
        var canvas = document.getElementById('webcam-canvas');
        $("#webcam-canvas").attr("width", win_w_scale).attr("height", win_h_scale);
        $("#webcam-video").attr("width", win_w_scale).attr("height", win_h_scale);
        var video = document.getElementById('cam');
        var context = canvas.getContext('2d');

        
        var video_proportion	= video.videoWidth / video.videoHeight;
        
        
        s_height	= win_h_scale/2 - win_w_scale/video_proportion/2;
        if(s_height<0){ s_height	= 0;}
        
        
        context.drawImage(video, 0, 0, win_w_scale, win_w_scale/video_proportion);

        
        
        // video.pause();

        const base64Canvas = canvas.toDataURL("image/jpeg").split(';base64,')[1];
        // var formData = new FormData();
        // formData.append('user_avatar', base64Canvas);
        formData = {
            "user_avatar":base64Canvas
        }
        $.ajax({
            type: "POST",
            dataType:"json",
            contentType: "application/json",
            data: JSON.stringify(formData),
            url: "https://q6wa28s276.execute-api.ap-east-1.amazonaws.com/awe-winter-s3",
            beforeSend: function() {
                $(".loading-wrap").addClass("active")
            },
            success: function(data) {
                $(".loading-wrap").removeClass("active");
                console.log(data);
                
                $(".print-img").attr("src", data['Location'])
                $(".print-item1 img").attr("src", img_dir+"animation"+hash_id+"_bottom.gif")
                // $(".print-item2 img").attr("src", home_url+data['Key'])

                setTimeout(function(){
                    html2canvas($(".print-wrap")[0],{allowTaint: true,useCORS: true, scrollY: -window.scrollY}).then(function(canvas) {
                        const base64Canvas2 = canvas.toDataURL("image/jpeg").split(';base64,')[1];
                        formData = {
                            "user_avatar":base64Canvas2
                        }
                        $.ajax({
                            type: "POST",
                            dataType:"json",
                            contentType: "application/json",
                            data: JSON.stringify(formData),
                            url: "https://q6wa28s276.execute-api.ap-east-1.amazonaws.com/awe-winter-s3",
                            beforeSend: function() {
                                $(".loading-wrap").addClass("active")
                            },
                            success: function(data) {
                                console.log(home_url+data['Key']);
                                // window.location = "./share.html#"+home_url+data['Key']
                            }
                        })
                    })
                }, Math.floor(Math.random() * 500));
                // window.location = "./share.html#"+home_url+data['Key']


                
            }
        });
    })
    $(".test").click(function(){
        html2canvas($(".camera-wrap")[0],{allowTaint: true,useCORS: true, scrollY: -window.scrollY}).then(function(canvas) {
            const base64Canvas2 = canvas.toDataURL("image/jpeg").split(';base64,')[1];
            formData = {
                "user_avatar":base64Canvas2
            }
            $.ajax({
                type: "POST",
                dataType:"json",
                contentType: "application/json",
                data: JSON.stringify(formData),
                url: "https://q6wa28s276.execute-api.ap-east-1.amazonaws.com/awe-winter-s3",
                beforeSend: function() {
                    $(".loading-wrap").addClass("active")
                },
                success: function(data) {
                    console.log(home_url+data['Key']);
                }
            })
        })
    })
});