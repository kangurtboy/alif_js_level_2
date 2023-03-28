function Tags({ tags }) {
  const tagsEls = tags.map((el, id) => <button key={id}>#{el}</button>);
  return <>теги: {tagsEls}</>;
}
export default Tags;
