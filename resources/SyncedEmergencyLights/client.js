import * as alt from 'alt-client';
import * as native from 'natives';

const toggleKey = 81; // Q | https://www.toptal.com/developers/keycode

alt.on('keydown', (key) => {
    if (key != toggleKey) return;
    if (!alt.Player.local.vehicle) return;

    if(alt.Player.local.vehicle.hasSyncedMeta("silentMode")) 
    {
        alt.emitServer("Server:SyncedEmergencyLights:SilentMode", alt.Player.local.vehicle, false);
        return;
    }

    alt.emitServer("Server:SyncedEmergencyLights:SilentMode", alt.Player.local.vehicle, true);
})

alt.onServer("Client:SyncedEmergencyLights:SetSilentMode", (vehicle, state) => {
    native.setVehicleHasMutedSirens(vehicle.scriptID, state);
})

alt.everyTick(() => {
    native.distantCopCarSirens(false); // disable AmbientSiren
    native.hideHudComponentThisFrame(16); // hide VehicleRadioWheel
    native.disableControlAction(2, 85, true); // disable VehicleRadioWheel
})

alt.on("gameEntityCreate", (entity) => {
    if (entity instanceof alt.Vehicle) 
    {
        if (!entity.hasSyncedMeta("silentMode")) return;

        native.setVehicleHasMutedSirens(entity.scriptID, true);
    }
});