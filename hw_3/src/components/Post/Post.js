function Post({ post }) {
  const { author } = post;
  const likeState = post.likedByMe ? 'liked' : 'unliked';
  return (
    <article>
      <header>
        <img
          alt={author.name}
          className="Post-avatar"
          height="50"
          src={author.avatar}
          width="50"
        />
        <h5>{author.name}</h5>
        <div>{post.created}</div>
        {post.hit && <span>HIT</span>}
      </header>
      <div>
        <div className="Post-content">{post.content}</div>
        <img className="Post-photo" src={post.photo} alt="post" />
      </div>
      <footer>
        <span className="Post-likes">
          <img
            src={`https://alif-skills.pro/media/${likeState}.svg`}
            alt="likes"
            width="20"
            height="20"
          />
          <span className="Post-likes-count">{post.likes}</span>
        </span>
      </footer>
    </article>
  );
}
export default Post;
