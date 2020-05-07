import React, {useState} from 'react';
import {storage} from '../../store/firebase/firebase';

const ImageUpload = () => {

  const [image, setImage] = useState({
    img: null,
    url: ''
  });

  const handleChange = e => {
    if (e.target.files[0]) {
      const img = e.target.files[0];
      setImage({
        img: img,
        url: ''
      });
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.img.name}`).put(image.img);
    uploadTask.on('state_changed',
      (snapshot) => {

      },
      (error) => {
        console.log(error)
      },
      () => {
        storage.ref('images').child(image.img.name).getDownloadURL().then(url => {
          setImage({
            img: image.img.name,
            url: url
          });
        })
      });
  };

  return (
    <div>
      <input type="file" onChange={handleChange}/>
      <button onClick={handleUpload}>Upload</button>
      <br/>
      <img src={image.url}/>
    </div>
  );
};

export default ImageUpload;