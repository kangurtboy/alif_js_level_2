import Tags from '../Tags/Tags';
import './Post.css';
import PostsProvider from '../../contexts/PostsProvider';

function Post({ post }) {
  const { author, photo } = post;
  const { like, remove, toggleVisibility, edit } = useContext(PostsContext);

  const handleClick = () => {
    //Обработчик для удаления поста
    remove(post.id);
  };

  const handleHidding = () => {
    //Обработчик для сокрытия поста
    toggleVisibility(post.id);
  };

  const handleEdit = () => {
    //Обработчик для редактирование выбраного поста
    edit(post.id);
  };

  const handleLike = () => {
    like();
  };

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
