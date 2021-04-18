// $(document).ready(function(){

//     $.get("http://5d76bf96515d1a0014085cf9.mockapi.io/playlist",function(response){
//         var videoPlaylistImg = response;
//         renderPlaylist(videoPlaylistImg);
//     })
//     function renderPlaylist(videoPlaylistImg){
//         for (let i = 0; i < videoPlaylistImg.length; i++) {
//             var playlistId = videoPlaylistImg[i].id;
//             var videoContainer = $("<div>").addClass("video-container");
//             var videoThumbnail = $("<img>").addClass("video-img").attr("src",videoPlaylistImg[i].thumbnail);
//             var videoTitle = $("<div>").addClass("video-title").html(videoPlaylistImg[i].title);
//             videoContainer.append(videoThumbnail,videoTitle);
//             $("#playlist-section").append(videoContainer);
//         }
//         $(".video-container").click(function() {
//             //alert("clicked");
//             $.get("http://5d76bf96515d1a0014085cf9.mockapi.io/video",function(response){
//                 var videoPlayer = response;
//                 for (let i = 0; i < videoPlayer.length; i++) {
                    
//                 }
//             });
//         });
//     }
//     // function iframeCardPlayer(videoPlayer,videoId) {
//     //     // for (let i = 0; i < videoPlayer.length; i++) {
//     //     //     var videoIframe = $("<iframe>").attr({
//     //     //         src: "https://player.vimeo.com/video/" + videoPlayer[i].vimeoId,
//     //     //         frameborder: "0",
//     //     //         width: "100%",
//     //     //         height: "400px"
//     //     //     });
       
            
        
        

//     // }
    
    
    


    
// });




/////////////////////////////////////playlist-section/////////////////////////////


$.get("http://5d76bf96515d1a0014085cf9.mockapi.io/playlist",function(playList){
    for (let i = 0; i < playList.length; i++) {
            renderPlayList(playList[i],i);
    }
});

//PlayList render 

function renderPlayList(playList,pos){
    

    var playlistId = playList.id;
    var playlistContainer = $("<div>").addClass("playlist-container");
    var playlistThumbnail = $("<img>").addClass("playlist-thumbnail").attr("src",playList.thumbnail);
    var playlistTitle = $("<div>").addClass("playlist-title").html(playList.title);
    playlistContainer.append(playlistThumbnail,playlistTitle);
    $("#playlist-section").append(playlistContainer);

    ////////////////click-playlist to interact////////////////

    playlistContainer.click(function() {
        //alert("clicked")
        $(window).scrollTop(0);
        $(".playlist-container").removeClass("active");
        playlistContainer.addClass("playlist-container active")
        $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/video",function(videoPlayer){
            iframePlayer(videoPlayer,playlistId);  
        });
    })

    if (pos === 0) {
        playlistContainer.addClass("video-container active");
      }
}

function iframePlayer(videoPlayer,id){
    var pos = id - 1;

    //video
    $("#video-player").attr({
        src: "https://player.vimeo.com/video/" + videoPlayer[pos].vimeoId,
        frameborder: "0",
        width: "100%",
        height: "400px"
    })
    //views
    
    $("#view-counts").html(calViews(videoPlayer[pos].views));
    //title
    $("#video-title").html(videoPlayer[pos].title);
    //description
    $("#video-description").html(videoPlayer[pos].description);
}
function calViews(ViewsCount){
    if(ViewsCount >= 1000)
        return parseFloat((ViewsCount/1000)) + "k";
    else
        return ViewsCount
}

$("#like").click(function(){
    $("#like").toggleClass("active")
});
$("#bookmark").click(function(){
    $("#bookmark").toggleClass("active")
});