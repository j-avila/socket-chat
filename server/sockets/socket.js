const { io } = require('../server')
const { Users } = require('../classes/users')
const { createMessage } = require('../helplers/utils')

const users = new Users()

io.on('connection', client => {
	client.on('userEnter', (data, callback) => {
		// console.log(data)
		if (!data.name || !data.room) {
			return callback({ error: true, message: 'el nombre/sala es requerido' })
		}

		// this is for put the user into the room
		client.join(data.room)

		let AllUsers = users.addPerson(client.id, data.name, data.room)
		const usersRoom = users.getRoomUsers(data.room)
		client.broadcast.to(data.room).emit('usersList', usersRoom)
		callback(usersRoom)
		console.log(`🖥 ${data.name} connected `)
	})

	client.on('disconnect', () => {
		const userDeleted = users.removeUser(client ? client.id : { name: 'user' })
		console.log('fails at this point', userDeleted)
		client.broadcast
			.to(userDeleted.room)
			.emit(
				'createMessage',
				createMessage('admin', ` 🔌  ${userDeleted.name} ha salido de la sala`)
			)
		client.broadcast
			.to(userDeleted.room)
			.emit('usersList', users.getRoomUsers(userDeleted.room))
	})

	// create chat messages
	client.on('createMessage', data => {
		const person = users.getPerson(client.id)
		const message = createMessage(person.name, data.message)
		client.broadcast.to(person.room).emit('createMessage', message)
	})

	// private message
	client.on('privateMessage', data => {
		const person = users.getPerson(client.id)
		client.broadcast
			.to(data.for)
			.emit('privateMessage', createMessage(person.name, data.message))
	})
})
