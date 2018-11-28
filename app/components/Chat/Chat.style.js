export default {
  messageContainerYours: {
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'flex-start',
    padding: 5,
    margin: 10,    
    marginRight: 20,
    borderRadius: 10
  },
  messageContainerMine: {
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'flex-end',
    padding: 5,
    margin: 10,
    marginLeft: 20,
    borderRadius: 10
  },
  ownerMine: {
    color: randomColor()
  },
  ownerYours: {
    color: 'red'
  },
  message: {
    color: 'black'
  }
};

function randomColor () {
  const colorString = '0987654321ABCDEF';
  let randomString = '';
  for (let i = 0; i < 6; i++) {
    randomString += colorString[Math.floor(Math.random() * 16)];
  }
  return '#' + randomString;
}