import { Item, Image } from './ImageGalleryItem.styled.jsx';

export default function ImageGalleryItem({
  description,
  link,
  showModalHandler,
}) {
  return (
    <Item>
      <Image src={link} alt={description} onClick={showModalHandler}></Image>
    </Item>
  );
}
