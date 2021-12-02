$(document).ready(function(){
    if(window.location.hash) {
        hash_url = location.href.split('#')[1];
        $(".main-image").attr("src", hash_url);
        $(".save-btn").attr("href", hash_url);
        $(".whatsapp-btn").attr("href", "https://wa.me/?text=XXXXXX+"+hash_url)
    } else {
        alert("Wrong Url")
    }

    const shareButton = document.querySelector('.share-btn');


    shareButton.addEventListener('click', async () => {
        console.log("aaa");
        const blob = await fetch(hash_url).then(r=>r.blob())
        
        let filesArray = new File([blob], 'file.jpg', {
                    type: blob.type,
                });
        try{

            if(navigator.canShare && navigator.canShare({files: [filesArray]})){
            navigator.share({
                files: [filesArray],
                title: "test",
            }).then(() => {
                console.log('Thanks for sharing!');
            })
            .catch((err)=>{
                console.log(err);
            });
            }else if (navigator.canShare && navigator.canShare({title: "test"})) { 
            navigator.share({
                title: "test",
                text: "test"
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
        window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURI(hash_url)+'&quote=AWE Winter', 'sharer', 'top=' + winTop + ',left=' + winLeft + 'toolbar=0,status=0,width='+winWidth+',height='+winHeight);
    })

});
