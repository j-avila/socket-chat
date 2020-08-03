var socket = io()

const params = new URLSearchParams(window.location.search)

if (!params.has('name') || !params.has('room')) {
	window.location = 'index.html'
	throw new Error('el nombre y la sala son requeridos', params)
}

const user = { name: params.get('name'), room: params.get('room') }

// when user is connceted
socket.on('connect', function () {
	console.log('🖥 connected to the server')
	socket.emit('userEnter', user, onlineUsers => {
		console.log(onlineUsers)
	})
})

// when user is disconnceted
socket.on('disconnect', function () {
	console.log('🔌 disconected to the server')
})

// log a message when an admin message is created
socket.on('createMessage', message => {
	console.log('server', message)
})

// listen user list Changes
socket.on('usersList', list => {
	console.log('users connected:', list)
})

// SEND A MESSAGE TO CHAT
/* socket.emit(
	'createMessage',
	{
		user,
		message,
	},
	resp => {
		console.log('✉', resp)
	}
) */

// send private message
socket.on('privateMessage', message => {
	console.log('🗯 on private', message)
})
