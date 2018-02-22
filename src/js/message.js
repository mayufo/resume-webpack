
!function(){
    var model =  Model({resourceName:'Message'})
    var view = View('section.message')
    var controller = Controller({
        messageList: null,
        messageForm: null,
        init: function (view, controller) {
            this.messageForm = view.querySelector('form')
            this.messageList = view.querySelector('ul')
            console.log(66, this)
            this.loadMessages()
        },
        loadMessages: function () {
            // 获取
            console.log(this.model)
            // console.log(77, this.messageList)
            this.model.fetch().then((messages) => {
                let array = messages.map((item) => item.attributes)
                array.forEach(item => {
                    let li = document.createElement('li')
                    let h3 = document.createElement('h3')
                    h3.innerText = `${item.name}:`
                    let p = document.createElement('p')
                    p.innerText = `${item.message}`
                    li.appendChild(h3)
                    li.appendChild(p)
                    this.messageList.appendChild(li)
                })
            })
        },
        save: function () {
            let name = this.messageForm.querySelector('input[name=name]').value
            let message = this.messageForm.querySelector('input[name=content]').value
            if (!name) {
                alert('请输入用户名')
            } else if (!message) {
                alert('请输入留言内容')
            } else if (name && message) {
                const Message = AV.Object.extend('Message');
                const messageObject = new Message();
                messageObject.save({
                    name,
                    message
                }).then((res) => {
                    res = res.attributes
                    alert('发送成功')
                    this.messageForm.querySelector('input[name=name]').value = ''
                    this.messageForm.querySelector('input[name=content]').value = ''
                    let li = document.createElement('li')
                    let h3 = document.createElement('h3')
                    h3.innerText = `${res.name}:`
                    let p = document.createElement('p')
                    p.innerText = `${res.message}`
                    li.appendChild(h3)
                    li.appendChild(p)
                    this.messageList.appendChild(li)
                })
            }
        },
        bindEvents: function() {
            // 存储
            this.messageForm.addEventListener('submit', (e) => {
                e.preventDefault()
                this.save()
            })
        }
    })
    controller.init(view, model)
}.call()







