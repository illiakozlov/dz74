import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    // Отримати список користувачів при завантаженні компоненту
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleLoadAlbums = (userId) => {
    // Завантажити альбоми для вибраного користувача
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => setAlbums(data));
    setSelectedUserId(userId);
    setSelectedAlbumId(null);
  };

  const handleLoadPhotos = (albumId) => {
    // Завантажити фото для вибраного альбому
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then((response) => response.json())
      .then((data) => setPhotos(data));
    setSelectedAlbumId(albumId);
  };

  return (
    <div>
      <h1>Список користувачів</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} 
            <button onClick={() => handleLoadAlbums(user.id)}>Album</button>
            {selectedUserId === user.id && (
              <ul>
                {albums.map((album) => (
                  <li key={album.id}>
                    {album.title} 
                    <button onClick={() => handleLoadPhotos(album.id)}>Photos</button>
                    {selectedAlbumId === album.id && (
                      <ul>
                        {photos.map((photo) => (
                          <li key={photo.id}>
                            <img src={photo.thumbnailUrl} alt={photo.title} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
