{let t=function(){let t=$("#new-post-form");t.submit(n=>{n.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:t=>{let n=e(t.data.post);$(".post-list").prepend(n),s($(".delete-post",n)),new PostComments(t.data.post._id),new ToggleLike($(" .toggle-like-button",n)),$("#posts").val(""),new Noty({theme:"semanticui",text:"Post published! AJAX",type:"success",layout:"topRight",timeout:1500}).show()},error:t=>{console.log("error occured ",t.responseText)}})})},e=function(t){return $(`\n    <div class="post-card" id="post-${t._id}">\n        <div class="post-user">\n            <div class="profile-img"\n                style="border-radius:50%; height: 50px; width: 50px; overflow:hidden">\n                <img src="${t.user.avatar?t.user.avatar:"/images/profile.png"}" alt="" style="width:100%" height="100%;">\n            </div>\n            <div class="profile-info">\n                <p>\n                    ${t.user.name}\n                </p>\n                <p id="time">\n                    ${new Date(t.createdAt).toString().substring(4,21)}\n                </p>\n            </div>\n        </div>\n        <div class="post-content">\n            <div class="post-image" style="width:100%; height: auto; margin-bottom:20px">\n             \n            </div>\n            <div class="post-text">\n                ${t.content}\n            </div>\n        </div>\n    \n        <hr>\n    \n    \n        <div class="post-actions">\n    \n            <a href="/likes/toggle/?id=${t._id}&type=Post" class="toggle-like-button" data-likes="0">\n                0 Like\n            </a>\n    \n            <a href="" class="share"><i class="fa-regular fa-comment"></i> Share</a>\n            <a href="" class="edit"><i class="fa-regular fa-pen-to-square"></i> Edit</a>\n                   \n            <a href="/posts/delete/${t._id}" class="delete-post" id="${t._id}"><i class="fa-regular fa-trash-can"></i> Delete</a>\n                       \n    \n        </div>\n        <hr>\n    \n        <form action="comments/create" id="post-${t._id}-comments-form" class="new-comment-form" method="POST" >\n            <input type="text" name="comment" class="comment-text-area" placeholder="Comment" required>\n                    <input type="hidden" name="post" value="${t._id}">\n            <button type="submit">Comment</button>\n        </form>\n                <ul class="comment-list" id="post-comments-${t._id}">\n            \n                </ul>\n    </div>\n        \n        `)},s=function(t){$(t).click(e=>{e.preventDefault(),$.ajax({method:"get",url:$(t).prop("href"),success:function(t){$(`#post-${t.data.post_id}`).remove(),new Noty({theme:"semanticui",text:"Post Deleted AJAX",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})})};(function(){$(".post-list>div").each(function(){let t=$(this),e=$(".delete-post",t);s(e);let n=t.prop("id").split("-")[1];new PostComments(n)})})(),t()}