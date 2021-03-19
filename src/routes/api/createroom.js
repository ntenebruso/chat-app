import { createRoom, getRoom, getUser, getAllRooms } from "./../../utils/rooms";
import { camelCase } from "lodash";

export async function post(req, res, next) {
    var requestedRoom = req.body.room;
    var requestedRoomSlug = camelCase(requestedRoom);
    if (getRoom(requestedRoomSlug)) {
        res.json({ error: "Room name taken" });
    } else {
        createRoom(req.body.room);
        res.redirect("/rooms");
    }
}