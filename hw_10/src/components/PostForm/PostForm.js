import React, { useRef, useContext } from 'react';
import PostsContext from '../../contexts/PostsContext';

function PostForm() {
  const { save, cancel, change, empty, edited } = useContext(PostsContext);

  const firstFocusEl = useRef(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const parsed =
      edited.tags
        ?.map((o) => o.replace('#', ''))
        .filter((o) => o.trim() !== '') || [];

    const tags = parsed.length > 0 ? parsed : null;
    const photo = { url: edited.photo?.url, alt: edited.photo?.alt || '' };
    save({
      ...edited,
      id: edited.id ? edited.id : Date.now(),
      created: edited ? edited.created : Date.now(),
      tags,
      photo: !photo.url ? null : photo,
    });
    firstFocusEl.current.focus();
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
          value={edited?.content || ''}
          onChange={handleChange}
          ref={firstFocusEl}
        ></textarea>
        <input
          name="tags"
          placeholder="tags"
          value={edited?.tags?.join(' ') || ''}
          onChange={handleChange}
        ></input>
        <input
          name="photo"
          placeholder="photo"
          value={edited?.photo?.url || ''}
          onChange={handleChange}
        ></input>
        <input
          name="alt"
          placeholder="alt"
          value={edited?.photo?.alt || ''}
          onChange={handleChange}
        ></input>
        <button>Ok</button>
        {edited.id !== empty.id && (
          <button onClick={handleReset}>Отменить</button>
        )}
      </form>
    </div>
  );
}

export default PostForm;
