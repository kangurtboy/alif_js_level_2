import Tags from '../Tags/Tags';
import './Post.css';

function Post({ post, onRemove, onHide , onEdit }) {
  const { author, photo, tags } = post;
  const likeState = post.likedByMe ? 'liked' : 'unliked';
  const hideButtonState = !post.hidden ? 'скрыть' : 'показать';
  const handleClick = () => {
    onRemove(post.id);
  };
  const handleHidding = () => {
    onHide(post.id);
  };
  const handleEdit = ()=>{
	onEdit(post.id);
  }
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

        <button onClick={handleClick}>удалить</button>
        <button onClick={handleHidding}>{hideButtonState}</button>
        <button onClick={handleEdit}>Изментиь</button>

        <div>{post.created}</div>
        {post.hit && <span>HIT</span>}
      </header>
      {!post.hidden ? (
        <div>
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
        </div>
      ) : (
        <></>
      )}
    </article>
  );
}
export default Post;
