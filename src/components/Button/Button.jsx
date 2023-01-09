import { LoadMoreButton } from './Button.styled.jsx';

export default function Button({ onloadMore }) {
  return (
    <LoadMoreButton type="button" onClick={onloadMore}>
      Load more
    </LoadMoreButton>
  );
}
