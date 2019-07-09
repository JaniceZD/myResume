!function () {
  var view = document.querySelector('section.message')

  var model = {
    //初始化
    init: function () {
      var APP_ID = 'sm7uGGOGF1zjxHzmEaDJdNna-gzGzoHsz';
      var APP_KEY = '2yGGdvrTWkA00uXoczlFo2Oh';

      AV.init({ appId: APP_ID, appKey: APP_KEY });
    },
    // 获取数据
    fetch: function () {
      var query = new AV.Query('Message')
      return query.find() //返回Promise对象
    },
    //创建数据
    save: function (name, content) {
      var Message = AV.Object.extend('Message')
      var message = new Message()
      return message.save({
        'name': name,
        'content': content
      }) //返回Promise对象
    }
  }

  var controller = {
    view: null,
    model: null,
    form: null,
    messageList: null,
    init: function (view, model) {
      this.view = view
      this.model = model
      this.form = view.querySelector('form')
      this.messageList = view.querySelector('#messageList')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    loadMessages: function () {
      this.model.fetch().then((messages) => {
        let array = messages.map((item) => item.attributes)
        array.forEach((item) => {
          let li = document.createElement('li')
          li.innerText = `${item.name}: ${item.content}`
          this.messageList.appendChild(li)
        })
      })
    },
    bindEvents: function () {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault()
        this.saveMessages()
      })
    },
    saveMessages: function () {
      let myForm = this.form
      let name = myForm.querySelector('input[name=name]').value
      let content = myForm.querySelector('input[name=content]').value

      this.model.save(name, content).then((object) => {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        this.messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
      })
    }
  }

  controller.init(view, model)

}.call()