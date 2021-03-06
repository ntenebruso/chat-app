import { camelCase } from "lodash";

const rooms = [{
    name: "Test Room",
    slug: "testRoom",
    users: []
}];

function createRoom(room) {
    rooms.push({ name: room, slug: camelCase(room), users: [] });
}

function getRoom(roomSlug) {
    var foundRoom = rooms.find(room => room.slug == roomSlug);
    return foundRoom;
}

function getUser(slug, userId) {
    var foundUser = getRoom(slug).users.find(user => user.id == userId);
    return foundUser;
}

function getAllRooms() {
    return rooms;
}

export {
    createRoom,
    getRoom,
    getUser,
    getAllRooms
}