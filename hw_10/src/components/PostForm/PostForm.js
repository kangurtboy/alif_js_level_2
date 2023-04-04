import React, { useRef, useContext } from 'react';
import PostsContext from '../../contexts/PostsContext';

function PostForm() {
  const { save, cancel, post,  change, empty, edited } =
    useContext(PostsContext);

  const firstFocusEl = useRef(null);

  const handleSubmit = (evt) => {
    firstFocusEl.current.focus();
    save();
  };

  const handleReset = (evt) => {
    evt.preventDefault();
    cancel();
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    change({ name, value });
  };

  //   useEffect(() => {
  //     //отслеживание состаяние редактируюмого поста
  //     if (typeof change === 'function') {
  //       change(edited);
  //     }
  //     setPost(edited);
  //   }, [edited, change, edit]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="content"
          placeholder="content"
          value={post?.content || ''}
          onChange={handleChange}
          ref={firstFocusEl}
        ></textarea>
        <input
          name="tags"
          placeholder="tags"
          value={post?.tags?.join(' ') || ''}
          onChange={handleChange}
        ></input>
        <input
          name="photo"
          placeholder="photo"
          value={post?.photo?.url || ''}
          onChange={handleChange}
        ></input>
        <input
          name="alt"
          placeholder="alt"
          value={post?.photo?.alt || ''}
          onChange={handleChange}
        ></input>
        <button>Ok</button>
        {edited !== empty && <button onClick={handleReset}>Отменить</button>}
      </form>
    </div>
  );
}

export default PostForm;
