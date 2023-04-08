import * as alt from 'alt';

alt.onClient('Server:SyncedEmergencyLights:Toggle', (player, vehicle) => {
    if (!vehicle) return;

    if (!vehicle.hasStreamSyncedMeta("silentMode")){
        vehicle.setStreamSyncedMeta("silentMode", true);
        return;
    }

    vehicle.deleteStreamSyncedMeta("silentMode");
});
