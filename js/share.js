var home_url = "https://www.awe-winter.link/";
var s3_url = "https://s3.ap-east-1.amazonaws.com/www.awe-winter.link/";
var img_dir = "https://cpkinlam.github.io/share_demo/images/";
var share_title = "AsiaWorld-Expo 亞洲國際博覽館";
var share_home = "https://7e5kwzc33l.execute-api.ap-east-1.amazonaws.com/default/share-image?url=";

$(document).ready(function(){
    if(window.location.hash) {
        hash_url = location.href.split('#')[1];
        $(".main-image").attr("src", s3_url+hash_url);
        $(".save-btn").attr("href", share_home+encodeURI(hash_url));
        $(".whatsapp-btn").attr("href", "https://wa.me/?text="+share_title+"+%0D\r\n"+share_home+encodeURI(hash_url));
    } else {
        alert("Wrong Url")
    }

    const shareButton = document.querySelector('.share-btn');


    shareButton.addEventListener('click', async () => {

        const blob = await fetch(s3_url+hash_url).then(r=>r.blob())
        
        let filesArray = new File([blob], 'file.jpg', {
                    type: blob.type,
                });
        try{

            if(navigator.canShare && navigator.canShare({files: [filesArray]})){
            navigator.share({
                files: [filesArray],
                title: share_title + "\r\n"+share_home+encodeURI(hash_url),
            }).then(() => {
                console.log('Thanks for sharing!');
            })
            .catch((err)=>{
                console.log(err);
            });
            }else if (navigator.canShare && navigator.canShare({title: "AsiaWorld-Expo 亞洲國際博覽館"})) { 
            navigator.share({
                title: share_title + "\r\n"+share_home+encodeURI(hash_url),
                text: share_title + "\r\n"+share_home+encodeURI(hash_url)
            }).then(() => {
                console.log('Thanks for sharing!');
            })
            .catch((err)=>{
                console.log(err);
            });
            } else {
                $(".popup-wrap").addClass('active');
            }
        }catch(err){
            $(".popup-wrap").addClass('active');
        }
    }, false);

    $(".popup-close, .popup-bg").click(function(){
        $(".popup-wrap").removeClass('active');
    })

    $(".facebook-btn").click(function(){
        let winHeight = 600;
        let winWidth = 600;
        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURI(share_home+encodeURI(hash_url))+'&quote='+encodeURI(share_title), 'sharer', 'top=' + winTop + ',left=' + winLeft + 'toolbar=0,status=0,width='+winWidth+',height='+winHeight);
    })

    $(".copylink-btn").click(function(){
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(share_title + "\r\n"+share_home+encodeURI(hash_url)).select();
        document.execCommand("copy");
        $temp.remove();
        $(".popup-wrap").removeClass('active');
    })

});
