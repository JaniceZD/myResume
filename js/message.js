var APP_ID = 'sm7uGGOGF1zjxHzmEaDJdNna-gzGzoHsz';
var APP_KEY = '2yGGdvrTWkA00uXoczlFo2Oh';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var query = new AV.Query('Message');
query.find()
  .then(
    function (messages) {
      let array = messages.map((item) => item.attributes)
      array.forEach((item) => {
        let li = document.createElement('li')
        li.innerText = `${item.name}: ${item.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
      })
    }
  )

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit', function (e) {
  e.preventDefault()
  let name = document.querySelector('input[name=name]').value
  let content = document.querySelector('input[name=content]').value

  console.log(name)
  var Message = AV.Object.extend('Message');
  var message = new Message();
  message.save({
    'name': name,
    'content': content
  }).then(function (object) {
    let li = document.createElement('li')
    li.innerText = `${object.attributes.name}: ${object.attributes.content}`
    let messageList = document.querySelector('#messageList')
    messageList.appendChild(li)
    myForm.querySelector('input[name=content]').value = ''
    console.log(object)
  })
})

/**
//创建TestObject表
var TestObject = AV.Object.extend('TestObject');
//在表中创建一行数据
var testObject = new TestObject();
//数据内容是 words: 'Hello World!'保存
//如果保存成功，则运行alert('')
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
*/
