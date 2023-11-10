createGames()
createUsers();

//Create games temporarily
function createGames() {
  let gamesArr = [
    {
      code: 0,
      name: 'Half-Life',
      category: 'shooter',
      description: 'Dr Gordon Freeman doesnt speak a single word, but he has one hell of a story to tell you, a revolutionary story that may not be all it seems, told not through scenes, but through visual surroundings.',
      price: '100',
      dev: 'Valve',
      year: '1998',
      platform: 'pc',
      videoUrl: 'https://www.youtube.com/embed/wtIp8jOo8_o',
      published: true,
      starred: false,
    },
    {
      code: 1,
      name: 'Portal',
      category: 'puzzle',
      description: 'Chell, and her new robot friend, Wheatley, face more puzzles devised by GLaDOS, an A.I. with the sole purpose of testing the Portal Gun and getting revenge on Chell for the events of Portal.',
      price: '200',
      dev: 'Valve',
      year: '2007',
      platform: 'pc',
      videoUrl: 'https://www.youtube.com/embed/tax4e4hBBZc',
      published: true,
      starred: false,
    },
    {
      code: 2,
      name: 'Half Life Alyx',
      category: 'shooter',
      description: 'Half-Life: Alyx is Valves return to the Half-Life series. It is the story of an impossible fight against a ruthless alien race known as the Combine. Set between the events of Half-Life and Half-Life 2, Alyx Vance and her father Eli mount an early resistance to the brutal occupation of Earth by the Combine.',
      price: '1000',
      dev: 'Valve',
      year: '2020',
      platform: 'vr',
      videoUrl: 'https://www.youtube.com/embed/O2W0N3uKXmo',
      published: true,
      starred: true,
    },
    {
      code: 3,
      name: 'Age Of Empires IV',
      category: 'strategy',
      description: 'Age of Empires IV offers you a real-time strategy experience evolved to a new generation. Putting you at the center of epic historical battles that shaped the world.',
      price: '600',
      dev: 'Microsoft',
      year: '2021',
      platform: 'xbox',
      videoUrl: 'https://www.youtube.com/embed/QFlVNtGJVDU',
      published: true,
      starred: false,
    },
  ];

  localStorage.setItem('games', JSON.stringify(gamesArr));
}

// Temporarily create users
function createUsers() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  currentAdmin = { avatar: 'https://gravatar.com/avatar/49336876fa3410db4538cd94c91c9ee7?s=100&d=robohash&r=x', username: 'Shubh', email: 'shubh@email.com', password: 'Shubh2023', role: 'admin', status: 'approved' };
  if (users.length == 0) {
    let usersArr = [
      currentAdmin,
      { avatar: 'https://gravatar.com/avatar/a02f0cd317c4805ecc316db0e3741327?s=100&d=robohash&r=x', username: 'Dev', email: 'dev@email.com', password: 'Shubh2023', role: 'admin', status: 'approved' },
      { avatar: 'https://gravatar.com/avatar/cfe3c204bd9f5cb4fcbd61cf109d947c?s=100&d=robohash&r=x', username: 'Arjun', email: 'arjun@email.com', password: 'Shubh2023', role: 'user', status: 'suspended' },
      { avatar: 'https://gravatar.com/avatar/8c66a907354c524c525441815415b338?s=100&d=robohash&r=x', username: 'Emma', email: 'emma@email.com', password: 'Shubh2023', role: 'user', status: 'pending' },
      { avatar: 'https://gravatar.com/avatar/1ba8e6babcb532aa831a055c68aaff25?s=100&d=robohash&r=x', username: 'Itachi', email: 'itachi@email.com', password: 'Shubh2023', role: 'user', status: 'approved' },
    ];
    localStorage.setItem('currentUser', JSON.stringify(currentAdmin));
    localStorage.setItem('users', JSON.stringify(usersArr));
  }
}