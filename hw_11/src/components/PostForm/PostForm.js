import React, { useRef, useContext } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { editCancel, editChange, editSubmit } from '../../store/actions';

function PostForm() {
  const dispatch = useDispatch();
  const edited = useSelector((state) => state.edited, shallowEqual);

  const firstFocusEl = useRef(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(editSubmit());
    firstFocusEl.current.focus();
  };

  const handleReset = (evt) => {
    evt.preventDefault();
    dispatch(editCancel());
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    dispatch(editChange(name, value));
  };

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
        {edited?.id !== empty?.id && (
          <button onClick={handleReset}>Отменить</button>
        )}
      </form>
    </div>
  );
}

export default PostForm;
