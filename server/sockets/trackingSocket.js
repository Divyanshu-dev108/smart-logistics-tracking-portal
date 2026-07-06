const { updateLocation } = require("../controllers/trackingController");

module.exports = (io) => {

    io.on("connection", (socket) => {

        console.log("Socket Connected:", socket.id);

        socket.on("locationUpdate", async (data) => {

            const {
                vehicleId,
                latitude,
                longitude
            } = data;

            const updatedVehicle = await updateLocation(
                vehicleId,
                latitude,
                longitude
            );

            if(updatedVehicle){

                io.emit("locationUpdated", updatedVehicle);

            }

        });

        socket.on("disconnect",()=>{

            console.log("Socket Disconnected:",socket.id);

        });

    });

};