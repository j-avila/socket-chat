const { io } = require('../server')

io.on('connection', client => {
	console.log('🖥 user connected ')

	client.on('disconnect', () => {
		console.log('🔌 user disconnected')
	})

	client.on('sendMessage', (message, callback) => {
		if (message.user) {
			client.broadcast.emit('sendMessage', message)
			callback({ message: 'todo salio bien!' })
		} else {
			callback({ message: 'todo saliio mal!!!!!!!' })
		}
	})
	client.emit('sendMessage', { user: 'server', message: 'welcome to sockets' })
})
