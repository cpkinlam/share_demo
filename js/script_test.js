var home_url = "https://www.awe-winter.link/";
var img_dir = "https://www.awe-winter.link/images/"
// var img_dir = "http://localhost:8888/awe/images/";
$(document).ready(function(){
    var video = document.querySelector("#cam");
    $(".loading-wrap").removeClass("active");

    $(".print-wrap").css("width", $(".camera-wrap").width() * 2 + "px");
    $(".print-wrap").css("height", $(".camera-wrap").height() * 2 + "px");

    if(window.location.hash) {
        hash_id = location.href.split('#')[1];
        $(".print-item1 img").attr("src", img_dir+"animation"+hash_id+"_bottom.gif")
        $(".animation-item1").prepend('<img src="'+img_dir+'animation'+hash_id+'_bottom.gif'+'" />')

        $(".camera-wrap .full-page-animation").css("background-image", "url("+img_dir+"animation"+hash_id+"_screen.gif)");
        $(".print-wrap .full-page-animation").css("background-image", "url("+img_dir+"animation"+hash_id+"_screen"+Math.floor(Math.random() * 3)+".png)");
    }

    /****************** index ***********/
    $(".temp-wrap").click(function(){
        var this_id = $(this).attr("data-id");
        window.location='./camera.html#'+this_id;
    })



    console.log(navigator.mediaDevices.enumerateDevices());


    $(".flashlight-btn").click(function(){
        if($("body").hasClass("zh")){
            alert("此瀏覽器並不支援閃光燈功能");
        }else{
            alert("Your browser is not supporting flashlight");
        }
        

        
    })

    $(".take-photo-btn").click(function(){
        var win_w_scale	= $(".camera-wrap").width();
		var win_h_scale	= $(".camera-wrap").height();
        var img = new Image;
        var canvas = document.getElementById('webcam-canvas');
        $("#webcam-canvas").attr("width", $("#cam").width()*2).attr("height", $("#cam").height()*2);
        var video = document.getElementById('cam');
        var context = canvas.getContext('2d');

        
        if($('#cam').hasClass("front")){
            context.scale(-1, 1); // Set scale to flip the image
            context.drawImage(video, $("#cam").width()*2*-1, 0, $("#cam").width()*2, $("#cam").height()*2);
        }else{
            context.drawImage(video, 0, 0, $("#cam").width()*2, $("#cam").height()*2);
        }
        

        
        
        

        
        
        video.pause();

        const base64Canvas = canvas.toDataURL("image/jpeg").split(';base64,')[1];
        var today = new Date();
        var random = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        var ss = String(today.getSeconds()).padStart(2, '0');
        var mm = String(today.getMinutes()).padStart(2, '0');
        var HH = String(today.getHours()).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        var MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = yyyy+MM+dd+HH+mm+ss+random;
        filePath = "avatars/awe_winter"+today+".jpg";
        thumbnailPath = "thumbnail/avatars/awe_winter"+today+".jpg";
        // var formData = new FormData();
        // formData.append('user_avatar', base64Canvas);
        formData = {
            "user_avatar":base64Canvas,
            "filePath": filePath
        }
        $.ajax({
            type: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                
            },
            crossDomain: true,
            contentType: 'application/json',
            data: JSON.stringify(formData),
            url: "https://rma-uat.sinoliving.com/testUpload",
            beforeSend: function() {
                $(".loading-wrap").addClass("active")
            },
            error: function(xhr, status, error) {
                console.log(xhr);
                console.log(error);
                console.log(status)
            },
            success: function(data) {
                if(typeof data == "string"){
                    data = JSON.parse(data)
                }
                console.log(data);
                
                // $(".print-img").attr("src", data['Location'])
                $(".print-wrap").css("background-image", "url("+data['Location']+")");
                // $(".print-item2 img").attr("src", home_url+data['Key'])
 

 
                    html2canvas($(".print-wrap")[0],{allowTaint: true,useCORS: true, scrollY: -window.scrollY}).then(function(canvas) {
                        const base64Canvas2 = canvas.toDataURL("image/jpeg", 0.8).split(';base64,')[1];
                        const base64Canvas2thumbnail = canvas.toDataURL("image/jpeg", 0.2).split(';base64,')[1];
                        
                        formData = {
                            "user_avatar":base64Canvas2thumbnail,
                            "filePath": thumbnailPath
                        }
                        $.ajax({
                            type: "POST",
                            headers: {
                                'Access-Control-Allow-Origin': '*'
                            },
                            crossDomain: true,
                            contentType: "application/json",
                            data: JSON.stringify(formData),
                            url: "https://rma-uat.sinoliving.com/testUpload",
                            beforeSend: function() {
                                $(".loading-wrap").addClass("active")
                            },
                            success: function(data) {
                            }
                        })

                        formData = {
                            "user_avatar":base64Canvas2,
                            "filePath": filePath
                        }
                        $.ajax({
                            type: "POST",
                            headers: {
                                'Access-Control-Allow-Origin': '*'
                            },
                            crossDomain: true,
                            contentType: "application/json",
                            data: JSON.stringify(formData),
                            url: "https://rma-uat.sinoliving.com/testUpload",
                            beforeSend: function() {
                                $(".loading-wrap").addClass("active")
                            },
                            success: function(data) {
                                if(typeof data == "string"){
                                    data = JSON.parse(data)
                                }
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
        var win_w_scale	= $(".camera-wrap").width();
		var win_h_scale	= $(".camera-wrap").height();
        var img = new Image;
        var canvas = document.getElementById('webcam-canvas');
        $("#webcam-canvas").attr("width", $("#cam").width()*2).attr("height", $("#cam").height()*2);
        var video = document.getElementById('cam');
        var context = canvas.getContext('2d');

        
        if($('#cam').hasClass("front")){
            context.scale(-1, 1); // Set scale to flip the image
            context.drawImage(video, $("#cam").width()*2*-1, 0, $("#cam").width()*2, $("#cam").height()*2);
        }else{
            context.drawImage(video, 0, 0, $("#cam").width()*2, $("#cam").height()*2);
        }
        
        video.pause();

        const base64Canvas = canvas.toDataURL("image/jpeg").split(';base64,')[1];
        var today = new Date();
        var random = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        var ss = String(today.getSeconds()).padStart(2, '0');
        var mm = String(today.getMinutes()).padStart(2, '0');
        var HH = String(today.getHours()).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        var MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = yyyy+MM+dd+HH+mm+ss+random;
        filePath = "avatars/awe_winter"+today+".jpg";
        thumbnailPath = "thumbnail/avatars/awe_winter"+today+".jpg";
        // var formData = new FormData();
        // formData.append('user_avatar', base64Canvas);
        formData = {
            "user_avatar":base64Canvas,
            "filePath": filePath
        }
        $.ajax({
            type: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                
            },
            crossDomain: true,
            contentType: 'application/json',
            data: JSON.stringify(formData),
            url: "https://rma-uat.sinoliving.com/testUpload",
            beforeSend: function() {
                $(".loading-wrap").addClass("active")
            },
            error: function(xhr, status, error) {
                console.log(xhr);
                console.log(error);
                console.log(status)
            },
            success: function(data) {
                if(typeof data == "string"){
                    data = JSON.parse(data)
                }
            }
        })
    })
});