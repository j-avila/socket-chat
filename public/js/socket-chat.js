var socket = io()
var params = new URLSearchParams(window.location.search)

if (!params.has('name') || !params.has('room')) {
	window.location = 'index.html'
	throw new Error('el nombre y la sala son requeridos', params)
}

var user = { name: params.get('name'), room: params.get('room') }

// when user is connceted
socket.on('connect', function () {
	console.log('🖥 connected to the server')
	socket.emit('userEnter', user, onlineUsers => {
		const roomUsers = onlineUsers.filter(u => u.room === user.room)
		// console.log('room', roomUsers)
		usersRender(roomUsers)
	})
})

// when user is disconnceted
socket.on('disconnect', function () {
	console.log('🔌 disconected to the server')
	usersRender()
})

// log a message when an admin message is created
socket.on('createMessage', message => {
	// console.log('server', message)
	renderMsg(message, false)
	scrollBottom()
})

// listen user list Changes
socket.on('usersList', list => {
	let usersList = list.filter(u => u.room === u.room)
	usersRender(usersList)
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
