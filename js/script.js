var home_url = "https://www.awe-winter.link/";
// var img_dir = "https://cpkinlam.github.io/share_demo/images/"
var img_dir = "http://localhost:8888/awe/images/";
$(document).ready(function(){
    var video = document.querySelector("#cam");

    $(".print-wrap").css("width", $(".camera-wrap").width() + "px");
    $(".print-wrap").css("height", $(".camera-wrap").height() + "px");

    if(window.location.hash) {
        hash_id = location.href.split('#')[1];
        $(".print-item1 img").attr("src", img_dir+"animation"+hash_id+"_bottom.gif")
        $(".animation-item1").prepend('<img src="'+img_dir+'animation'+hash_id+'_bottom.gif'+'" />')
        $(".full-page-animation").addClass('animation'+hash_id);
    }

    /****************** index ***********/
    $(".temp-wrap").click(function(){
        var this_id = $(this).attr("data-id");
        window.location='./camera.html#'+this_id;
    })



    console.log(navigator.mediaDevices.enumerateDevices());



    $(".switch-camera-btn").click(function(){
        $("#quickButton").click();
    })


    $(".take-photo-btn").click(function(){
        var win_w_scale	= $(".camera-wrap").width();
		var win_h_scale	= $(".camera-wrap").height();
        var img = new Image;
        var canvas = document.getElementById('webcam-canvas');
        $("#webcam-canvas").attr("width", $("#cam").width()).attr("height", $("#cam").height());
        var video = document.getElementById('cam');
        var context = canvas.getContext('2d');

        

        context.scale(-1, 1); // Set scale to flip the image

        
        
        context.drawImage(video, $("#cam").width()*-1, 0, $("#cam").width(), $("#cam").height());

        
        
        // video.pause();

        const base64Canvas = canvas.toDataURL("image/jpeg").split(';base64,')[1];
        // var formData = new FormData();
        // formData.append('user_avatar', base64Canvas);
        formData = {
            "user_avatar":base64Canvas
        }
        $.ajax({
            type: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            dataType:"json",
            crossDomain: true,
            contentType: "application/json",
            data: JSON.stringify(formData),
            url: "https://q6wa28s276.execute-api.ap-east-1.amazonaws.com/awe-winter-s3",
            beforeSend: function() {
                $(".loading-wrap").addClass("active")
            },
            success: function(data) {
                console.log(data);
                
                // $(".print-img").attr("src", data['Location'])
                $(".print-wrap").css("background-image", "url("+data['Location']+")");
                // $(".print-item2 img").attr("src", home_url+data['Key'])

 
                    html2canvas($(".print-wrap")[0],{allowTaint: true,useCORS: true, scrollY: -window.scrollY}).then(function(canvas) {
                        const base64Canvas2 = canvas.toDataURL("image/jpeg").split(';base64,')[1];
                        formData = {
                            "user_avatar":base64Canvas2
                        }
                        $.ajax({
                            type: "POST",
                            headers: {
                                'Access-Control-Allow-Origin': '*'
                            },
                            dataType:"json",
                            crossDomain: true,
                            contentType: "application/json",
                            data: JSON.stringify(formData),
                            url: "https://q6wa28s276.execute-api.ap-east-1.amazonaws.com/awe-winter-s3",
                            beforeSend: function() {
                                $(".loading-wrap").addClass("active")
                            },
                            success: function(data) {
                                console.log(data['Key']);
                                window.location = "./share.html#"+data['Key']
                            }
                        })
                    })
                
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
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
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