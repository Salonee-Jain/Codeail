{

    //method to post data 
    let createPost = function () {

        let newPostform = $('#new-post-form');
        
      
        newPostform.submit((e) => {
            e.preventDefault();
            let formData = new FormData()
            console.log($('#posts').val());
            formData.append('posts', $('#posts').val()) 
            formData.append('postpic', document.getElementById('postpic').files[0]) 
            $.ajax({
                type: 'post',
                url: '/posts/create',
                processData: false,
                contentType: false,
                cache: false,
                data:  formData,
                success: (data) => {
                    let newPost = createnewPostdom(data.data.post)
                    $('.post-list').prepend(newPost);
                    deletePost($('.delete-post', newPost) );
                 
                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));
                    $("#posts").val('');
                    new Noty({
                        theme: 'semanticui',
                        text:  "Post published! AJAX",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();

                   
                },
                error: (error) => { console.log("error occured ", error); }

            })

        })
    }

    //we will get go to post cantrollere and then add data in DB then get that data back here
    //create dom of the post




    //populate user from post through ajax
    let createnewPostdom = function (posts) {
        let path= '/images/profile-a536980956.png'

        return $(`
    <div class="post-card" id="post-${posts._id}">
        <div class="post-user">
            <div class="profile-img"
                style="border-radius:50%; height: 50px; width: 50px; overflow:hidden">
                <img src="${posts.user.avatar?posts.user.avatar:path}" alt="" style="width:100%" height="100%;">
            </div>
            <div class="profile-info">
                <p>
                    ${posts.user.name}
                </p>
                <p id="time">
                    ${new Date(posts.createdAt).toString().substring(4, 21)}
                </p>
            </div>
        </div>
        <div class="post-content">
        
        ${post.postpic}
            <div class="post-image" style="width:100%; height: auto; margin-bottom:20px">
                <img src="${posts.postpic}" alt="" style="width:100%; height:auto">
            </div>
           
            <div class="post-text">
                ${posts.content }
            </div>
        </div>
    
        <hr>
    
    
        <div class="post-actions">
    
            <a href="/likes/toggle/?id=${posts._id}&type=Post" class="toggle-like-button" data-likes="0">
                0 Like
            </a>
    
            <a href="" class="share"><i class="fa-regular fa-comment"></i> Share</a>
            <a href="" class="edit"><i class="fa-regular fa-pen-to-square"></i> Edit</a>
                   
            <a href="/posts/delete/${posts._id}" class="delete-post" id="${posts._id}"><i class="fa-regular fa-trash-can"></i> Delete</a>
                       
    
        </div>
        <hr>
    
        <form action="comments/create" id="post-${ posts._id }-comments-form" class="new-comment-form" method="POST" >
            <input type="text" name="comment" class="comment-text-area" placeholder="Comment" required>
                    <input type="hidden" name="post" value="${posts._id}">
            <button type="submit">Comment</button>
        </form>
                <ul class="comment-list" id="post-comments-${posts._id}">
            
                </ul>
    </div>
        
        `)
    }


    // for deleting the post

    let deletePost = function(deleteLink){
        $(deleteLink).click((e)=>{
            e.preventDefault();
            $.ajax({
                method: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'semanticui',
                        text: "Post Deleted AJAX",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                
                error: function(err){
                    console.log(err.responseText)
                },
            })

        })

    }
    
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        
        $('.post-list>div').each(function(){

            let self = $(this);
            let deleteButton = $('.delete-post', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }


    convertPostsToAjax();
  
    createPost();
  
}


