import Tags from '../Tags/Tags';
import './Post.css';
import { useDispatch } from 'react-redux';
import { edit, like, /* show, */ remove, hide } from '../../store/actions';
function Post({ post }) {
  const dispatch = useDispatch();
  const { author, photo, tags } = post;
  const likeState = post.likedByMe ? 'liked' : 'unliked';
  const hideButtonState = !post.hidden ? 'скрыть' : 'показать';

  const handleRemove = () => {
    //Обработчик для удаления поста
    dispatch(remove(post.id));
  };

  const handleHidding = () => {
    //Обработчик для переключение видимости поста
    dispatch(hide(post.id));
  };

  const handleEdit = () => {
    //Обработчик для редактирование выбраного поста
    dispatch(edit(post.id));
  };

  const handleLike = () => {
    dispatch(like(post.id));
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

        <button onClick={handleRemove}>удалить</button>
        <button onClick={handleHidding}>{hideButtonState}</button>
        <button onClick={handleEdit}>изменить</button>

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
                onClick={handleLike}
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
