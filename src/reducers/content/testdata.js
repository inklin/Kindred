export const digests = {
  '1': {
    id: '1',
    PersonId: '3',
    readAt: 'Today',
    sentAt: 'Yesterday',
    updates: ['1', '2']
  },
  '2': {
    id: '2',
    PersonId: '3',
    readAt: null,
    sentAt: 'Monday',
    updates: ['3']
  }
}

export const updates = {
  '1': {
    id: '1',
    AccountId: '1',
    sections: ['1', '2'],
    publishedAt: '25 December 2015'
  },
  '2': {
    id: '2',
    AccountId: '2',
    sections: ['3'],
    publishedAt: '19 December 2015'
  },
  '3': {
    id: '3',
    AccountId: '1',
    sections: ['4', '5'],
    publishedAt: '19 December 2016'
  }
}

export const sections = {
  '1': {
    id: '1',
    AccountId: '1',
    title: 'Test Section',
    body: 'test section please ignore, id 1',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Vancouver_-_Gastown_01.jpg'
  },
  '2': {
    id: '2',
    AccountId: '1',
    title: 'The 2nd Section',
    body: 'I am section 2',
    imageUrl: 'http://i.imgur.com/TAf5zra.jpg'
  },
  '3': {
    id: '3',
    AccountId: '2',
    title: 'My very first post',
    body: 'Im all hooked up to redux, look at this store go!',
    imageUrl: 'http://i.imgur.com/UMSYaaI.jpg'
  },
  '4': {
    id: '4',
    AccountId: '1',
    title: 'Still think we need a section',
    body: 'by that I mean header column in the section DB but thats just me;',
    imageUrl: 'http://i.imgur.com/gO3vYga.jpg'
  },
  '5': {
    id: '5',
    AccountId: '1',
    title: 'Theres also redundant Account ids but hey whatever',
    body: 'Im all hooked up to redux, look at this store go!',
    imageUrl: 'http://i.imgur.com/NPsCCKZ.jpg'
  }
}

export const accounts = {
  '1': {
    id: '1',
    username: 'first',
    firstName: 'Bob',
    lastName: 'Ross',
    email: 'bob@ross.com'
  },
  '2': {
    id: '2',
    username: 'suer2',
    firstName: 'memeemmeme',
    lastName: 'astasd',
    email: 'valid@email.com'
  },
  '3': {
    id: '3',
    username: 'ggrochwo',
    firstName: 'grhaam',
    lastName: 'grochow',
    email: 'ggrochwo@gmail'
  }
}

export const comments = {
  '1': {
    AccountId: '2',
    content: 'Comment #1, this post sucks'
  }
}
