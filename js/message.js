!function () {
  var view = View('section.message')

  var model = Model({ resourceName: 'Message' })

  var controller = Controller({
    form: null,
    messageList: null,
    init: function (view, model) {
      this.form = view.querySelector('form')
      this.messageList = view.querySelector('#messageList')
      this.loadMessages()
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

      this.model.save({
        'name': name,
        'content': content
      }).then((object) => {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        this.messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
      })
    }
  })

  controller.init(view, model)

}.call()