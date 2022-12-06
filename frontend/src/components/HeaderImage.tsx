interface HeaderImageProps {
  imageSource: string
}

function HeaderImage({ imageSource }: HeaderImageProps) {
  return (
    <div className="imageWrapper">
      <img
        className="headerImage"
        src={imageSource}
        alt="kuikka"
        draggable="false"
      />
    </div>
  )
}

export default HeaderImage
