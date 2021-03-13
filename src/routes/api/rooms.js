import { createRoom, getRoom, getUser, getAllRooms } from "./../../utils/rooms";

export async function get(req, res, next) {
    res.json(getAllRooms());
}