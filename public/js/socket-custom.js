var socket = io()

socket.on('connect', function () {
	console.log('🖥 connected to the server')
})
socket.on('disconnect', function () {
	console.log('🔌 disconected to the server')
})

socket.on('sendMessage', message => {
	console.log(message)
})

const emitMessage = () => {
	const message = document.getElementById('message').value
	socket.emit('sendMessage', { user: 'jose', message }, resp => {
		console.log('🐣: ', resp)
	})
}
