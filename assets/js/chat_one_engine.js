

$('.message').click(function (e) { 
    let id = $(e.target).attr('href').split('/')[2]
    e.preventDefault();
  
    $.ajax({
        method: 'get',
        url: $(e.target).prop('href'),
        success: function(data){
            new ChatEngine('user-chat-box', data.user)
        },
        
        error: function(err){
            console.log(err)
        },
    })

    
});




