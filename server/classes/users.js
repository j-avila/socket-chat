class Users {
	constructor() {
		this.users = []
	}

	addPerson(id, name, room) {
		let person = { id, name, room }
		this.users.push(person)
		return this.users
	}

	getPerson(id) {
		let person = this.users.filter(user => id === user.id)[0]
		return person
	}

	getAllUsers() {
		return this.users
	}

	getRoomUsers(room) {
		let roomUsers = this.users.filter(user => user.room === room)
		return roomUsers
	}

	removeUser(id) {
		let deletedUser = this.getPerson(id)
		this.users = this.users.filter(user => id !== user.id)
		return deletedUser
	}
}

module.exports = {
	Users,
}
