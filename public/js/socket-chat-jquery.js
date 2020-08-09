var params = new URLSearchParams(window.location.search)

// user Refs
var user = params.get('name')
var room = params.get('room')
var date = new Date()
var currentTime = date.getHours() + ':' + date.getMinutes() + 'hrs'

// jquery refs
var usersDiv = $('#divUsuarios')
var msgForm = $('#sendForm')
var msgTxt = $('#txtMessage')
var divChatBox = $('#divChatbox')

// render users functions

function usersRender(users) {
	console.log(users)

	var html = ''
	html += '<li>'
	html +=
		'<a href="javascript:void(0)" class="active">Chat de <span>' +
		room +
		'</span></a>'
	html += '</li>'

	for (var i = 0; i < users.length; i++) {
		html += '<li>'
		html +=
			'<a data-id="' +
			users[i].id +
			'" href="javascript:void(0)"><img src="https://picsum.photos/600/600/?blur&random=' +
			i +
			'" alt="user-img" class="img-circle" /><span>' +
			users[i].name +
			'<small class="text-success">online</small></span></a>'
		html += '</li>'
	}

	usersDiv.html(html)
}

function renderMsg(msg, currentUser) {
	var html = ''
	var adminClass = msg.name === 'admin' ? 'danger' : 'inverse'
	var avatar = `https://picsum.photos/seed/600/600/?blur&`

	if (currentUser) {
		html += '<li class="animated fadeIn">'
		html += '	<div class="chat-img">'
		html += '		<img src="' + avatar + '" alt="user" />'
		html += '	</div>'
		html += '	<div class="chat-content">'
		html += '		<h5>' + msg.name + '</h5>'
		html += '		<div class="box bg-light-info">' + msg.message + ' </div>'
		html += '	</div>'
		html += '	<div class="chat-time">' + currentTime + '</div>'
		html += '</li>'
	} else {
		html += '<li class="reverse">'
		html += '	<div class="chat-content">'
		html += '		<h5>' + msg.name + '</h5>'
		html +=
			'		<div class="box bg-light-' + adminClass + '">' + msg.message + '</div>'
		html += '	</div>'
		html += '	<div class="chat-img">'
		if (msg.name !== 'admin') {
			html += '		<img src="' + avatar + '" alt="user" />'
		}
		html += '	</div>'
		html += '	<div class="chat-time">' + currentTime + '</div>'
		html += '</li>'
	}

	divChatBox.append(html)
}

function scrollBottom() {
	// selectors
	var newMessage = divChatBox.children('li:last-child')

	// heights
	var clientHeight = divChatBox.prop('clientHeight')
	var scrollTop = divChatBox.prop('scrollTop')
	var scrollHeight = divChatBox.prop('scrollHeight')
	var newMessageHeight = newMessage.innerHeight()
	var lastMessageHeight = newMessage.prev().innerHeight() || 0

	if (
		clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
		scrollHeight
	) {
		divChatBox.scrollTop(scrollHeight)
	}
}

// listeners
usersDiv.on('click', 'a', function () {
	var id = $(this).data('id')
	console.log(id)
})

msgForm.on('submit', function (e) {
	e.preventDefault()
	if (msgTxt.val().trim().length === 0) {
		return
	}

	// SEND A MESSAGE TO CHAT
	socket.emit('createMessage', { user, message: msgTxt.val() }, mesg => {
		msgTxt.val('').focus()
		renderMsg(mesg, true)
		scrollBottom()
	})

	console.log(user, msgTxt.val())
})
