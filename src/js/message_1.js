/**
 * Created by liuhuimin on 2018/1/21.
 */
!function(){
    console.log(333)
}.call()

// 初始化
const appId = 'UzIwpzSMQd8e18dbqAV9iAj9-gzGzoHsz';
const appKey = 'hwvTdsbnq4CUpodXAy1Lpmlo';
AV.init({ appId, appKey });




let messageForm = document.querySelector('#messageForm')
let messageList = document.querySelector('#messageList')

// 存储
messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let name = messageForm.querySelector('input[name=name]').value
    let message = messageForm.querySelector('input[name=content]').value
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
            messageForm.querySelector('input[name=name]').value = ''
            messageForm.querySelector('input[name=content]').value = ''
            let li = document.createElement('li')
            let h3 = document.createElement('h3')
            h3.innerText = `${res.name}:`
            let p = document.createElement('p')
            p.innerText = `${res.message}`
            li.appendChild(h3)
            li.appendChild(p)
            messageList.appendChild(li)
        })
    }
})
// 获取
var query = new AV.Query('Message');
query.find().then((message) => {
    let array = message.map((item) => item.attributes)
    console.log(array)
    array.forEach(item => {
        let li = document.createElement('li')
        let h3 = document.createElement('h3')
        console.log(item.name)
        h3.innerText = `${item.name}:`
        let p = document.createElement('p')
        p.innerText = `${item.message}`
        li.appendChild(h3)
        li.appendChild(p)
        messageList.appendChild(li)
    })
}, (error) => {
    // 异常处理
    alert('请稍后留言')
});
