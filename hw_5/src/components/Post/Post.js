import Tags from '../Tags/Tags';
import  './Post.css';

function Post({ post }) {
  const { author, photo, tags } = post;
  const likeState = post.likedByMe ? 'liked' : 'unliked';
  return (
    <article>
      <header>
        {author.avatar && (
          <img
            alt={author.name}
            className="Post-avatar"
            height="50"
            src={author.avatar}
            width="50"
          />
        )}
        <h5>{author.name}</h5>
        <div>{post.created}</div>
        {post.hit && <span>HIT</span>}
      </header>
      <div>
        <div className="Post-content">{post.content}</div>
        {photo && (
          <img className="Post-photo" src={photo.url} alt={photo.alt} />
        )}
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
          {tags && <Tags tags={tags} />}
        </span>
      </footer>
    </article>
  );
}
export default Post;
