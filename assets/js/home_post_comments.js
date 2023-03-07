
// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments {
    // constructor is used to initialize the instance of the class whenever a new instance is created

    constructor(postId) {

        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);
        let self = this;
        // call for all the existing comments
        $('.delete-comment', this.postContainer).each(function () {
            self.deleteComment($(this));
        });
    }

    createComment(postId) {
        let pSelf = this;
        this.newCommentForm.submit(function (e) {
            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function (data) {

                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($('.delete-comment', newComment));
                    $(".comment-text-area").val('');
                    new Noty({
                        theme: 'semanticui',
                        text: "Comment published! AJAX",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();


                }, error: function (error) {
                    console.log(error.responseText);
                }
            });


        });


    }


    newCommentDom(comment) {

        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`
            
        <li id="comment-${comment._id}">
            <div class="comment-user">
                <p>
                    ${comment.user.name}
                    <br>
                    ${new Date(comment.createdAt).toString().substring(4, 21) }
                </p>
                <div class="comment-actions">
                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                            0 <i class="fa-regular fa-heart"></i>
                        </a>

                        <a href="comments/delete/${comment._id}" class="delete-comment" id="<%= comment._id  %>"><i
                        class="fa-regular fa-trash-can"></i></a>
                   
        </div>
            </div>
            <div class="comment-content">
                <p>
                ${comment.content}
                </p>
                
            </div>
        </li>
            
            `);

    }


    deleteComment(deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'semanticui',
                        text: "Comment Deleted AJAX",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });

        });
    }
}