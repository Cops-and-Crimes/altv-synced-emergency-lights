import * as alt from 'alt-client';
import * as native from 'natives';

const toggleKey = 81; // Q | https://www.toptal.com/developers/keycode

const player = alt.Player.local;

alt.on('keydown', (key) => {
    if (key != toggleKey) return;
    if (!player.vehicle) return;

    alt.emitServer("Server:SyncedEmergencyLights:Toggle", player.vehicle);
})

alt.everyTick(() => {
    native.distantCopCarSirens(false); // disable AmbientSiren
    native.hideHudComponentThisFrame(16); // hide VehicleRadioWheel
    native.disableControlAction(2, 85, true); // disable VehicleRadioWheel
})

function Sync(entity){
    if (!entity instanceof alt.Vehicle) return;

    if (!entity.hasStreamSyncedMeta("silentMode")) 
    {
        native.setVehicleHasMutedSirens(entity, false);
        return;
    }

    native.setVehicleHasMutedSirens(entity, true);
}

alt.on("gameEntityCreate", (entity) => {
    Sync(entity);
});
alt.on("streamSyncedMetaChange", (entity, key, newValue, oldValue) => {
    Sync(entity);
});