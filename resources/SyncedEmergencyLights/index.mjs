import * as alt from 'alt';

alt.onClient('Server:SyncedEmergencyLights:SilentMode', (player, vehicle, state) => {
    if (state){
        vehicle.setSyncedMeta("silentMode", true);
    }
    else {
        vehicle.deleteSyncedMeta("silentMode");
    }
    
    alt.emitAllClients("Client:SyncedEmergencyLights:SetSilentMode", vehicle, state);
});
