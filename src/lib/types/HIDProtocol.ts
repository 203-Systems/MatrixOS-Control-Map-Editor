export enum HIDCommand {
    DEVICE_DESCRIPTOR = 0x01,
    UAD_STATUS = 0x02,
    UAD_DATA = 0x03,
    UAD_SAVE = 0x04,
    UAD_LOAD = 0x05,
    UAD_BEGIN = 0x06,
    ERR = 0xFE,
    ACK = 0xFF,
}
export const HIDWrite = 0x80;
export const HIDResponse = 0x80;

export type DeviceDescriptor = {
    uadVersion: [number, number];
    xSize: number;
    ySize: number;
    maxLayers: number;
    maxUADSize: number;
    vendorId: number;
    deviceId: number;
}

export type UADStatus = {
    loaded: boolean;
    uadSize: number;
    layerCount: number;
    layerEnabled: number;
    layerPassthrough: number;
}

export type UADData = {
    section: number;
    size: number;
    data: number[];
}
