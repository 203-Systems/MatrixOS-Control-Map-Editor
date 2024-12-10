<script lang="ts">
    import type { MidiActionData } from "./MidiActionData";
    import { AnalogSource, MidiType, MidiTypeMap, AnalogSourceMap } from "./MidiActionData";
    import ActionTemplate from "../ActionTemplate.svelte";
    import DropDown from "../../common/DropDown.svelte";
    import {createEventDispatcher} from 'svelte';
    import NumericUpDown from "../../common/NumericUpDown.svelte";
    import FloatUpDown from "../../common/FloatUpDown.svelte";
    import CheckBox from "../../common/CheckBox.svelte";
    import {MidiAction} from "./MidiAction";
    import '../Action.css';

    const dispatch = createEventDispatcher();
    
    export let data: MidiActionData;

    function changeMidiActionType(type: MidiType): void {
        console.log(data.type);
        console.log(typeof data.type);
        // if (MidiTypeMap.has(type))
        // {
        //     console.log("Setting type to " + type);
        //     data.type = type;
        // }
        // else
        // {
        //     console.log("Setting type to Default Note" + type);
        //     data.type = MidiType.Note;
        // }

        // data.type = MidiTypeMap.has(type) ? type : MidiType.Note;
        switch (data.type) {
            case MidiType.Note:
                data.data = {
                    channel: 1,
                    note: 60,
                    source: AnalogSource.KeyForce,
                    begin: 0,
                    end: 127,
                }
                break;

            case MidiType.ControlChange:
                data.data = {
                    channel: 1,
                    control: 0,
                    source: AnalogSource.KeyForce,
                    begin: 0,
                    end: 127,
                }
                break;

            case MidiType.ProgramChange:
                data.data = {
                    channel: 1,
                    control: 0,
                }
                break;

            case MidiType.ChannelPressure:
                data.data = {
                    channel: 1,
                    source: AnalogSource.KeyForce,
                    begin: 0,
                    end: 127,
                }
                break;
            
            case MidiType.PitchBend:
                data.data = {
                    channel: 1,
                    source: AnalogSource.KeyForce,
                    begin: 0.0, // Range is -1.0 to 1.0
                    end: 1.0,
                }
                break;

            case MidiType.RPN:
            case MidiType.NRPN:
                data.data = {
                    channel: 1,
                    control: 0,
                    source: AnalogSource.Persistent,
                    begin: 0,
                    end: 16383,
                }
                break;

            case MidiType.Sysex:
                data.data = {
                    sysex: "0xF0 0xF7",
                }
                break;

            case MidiType.Start:
            case MidiType.Continue:
            case MidiType.Stop:
            case MidiType.Reset:
                data.data = null;
            
            default:
                console.log("unknown type");
        }
    }
</script>

<ActionTemplate actionTitle={MidiAction.description} on:removeAction={() => dispatch('removeAction')}>
    <div class="action-settings">
        <div class="action-setting-slot">
            <span>Message Type</span>

            <DropDown options={MidiTypeMap} bind:value={data.type} on:selectionChanged={e => changeMidiActionType(e.detail.option)}/>
        </div>

        {#if data.type === MidiType.Note}
            <div class="action-setting-slot">
                <span>Channel</span>
                <NumericUpDown bind:value={data.data.channel} min={1} max={16}/>
            </div>

            <div class="action-setting-slot">
                <span>Note</span>

                <NumericUpDown bind:value={data.data.note} min={0} max={127}/>
            </div>

            <div class="action-setting-slot">
                <span>Velocity Source</span>

                <DropDown options={AnalogSourceMap} bind:value={data.data.source}/>
            </div>

            {#if data.data.source === AnalogSource.KeyForce || data.data.source === AnalogSource.Momentary || data.data.source === AnalogSource.Toggle}
                <div class="action-setting-slot">
                    <span>Velocity Range</span>

                    <NumericUpDown bind:value={data.data.begin} min={0} max={127}/>
                    <NumericUpDown bind:value={data.data.end} min={0} max={127}/>
                </div>
            {:else if data.data.source === AnalogSource.Persistent}
                <div class="action-setting-slot">
                    <span>Velocity Value</span>
                    <NumericUpDown bind:value={data.data.end} min={0} max={127}/>
                </div>
            {/if}
            
        {:else if data.type === MidiType.ControlChange}
            <div class="action-setting-slot">
                <span>Channel</span>
                <NumericUpDown bind:value={data.data.channel} min={1} max={16}/>
            </div>
            
            <div class="action-setting-slot">
                <span>Control</span>

                <NumericUpDown bind:value={data.data.control} min={0} max={127}/>
            </div>

            <div class="action-setting-slot">
                <span>Value Source</span>

                <DropDown options={AnalogSourceMap} bind:value={data.data.source}/>
            </div>

            {#if data.data.source === AnalogSource.KeyForce || data.data.source === AnalogSource.Momentary || data.data.source === AnalogSource.Toggle}
                <div class="action-setting-slot">
                    <span>Value Range</span>

                    <NumericUpDown bind:value={data.data.begin} min={0} max={127}/>
                    <NumericUpDown bind:value={data.data.end} min={0} max={127}/>
                </div>
            {:else if data.data.source === AnalogSource.Persistent}
                <div class="action-setting-slot">
                    <span>Value</span>
                    <NumericUpDown bind:value={data.data.end} min={0} max={127}/>
                </div>
            {/if}

        {:else if data.type === MidiType.ProgramChange}
            <div class="action-setting-slot">
                <span>Channel</span>
                <NumericUpDown bind:value={data.data.channel} min={1} max={16}/>
            </div>
            
            <div class="action-setting-slot">
                <span>Control</span>

                <NumericUpDown bind:value={data.data.control} min={0} max={127}/>
            </div>

        {:else if data.type === MidiType.ChannelPressure}
            <div class="action-setting-slot">
                <span>Channel</span>
                <NumericUpDown bind:value={data.data.channel} min={1} max={16}/>
            </div>

            <div class="action-setting-slot">
                <span>Velocity Source</span>

                <DropDown options={AnalogSourceMap} bind:value={data.data.source}/>
            </div>

            {#if data.data.source === AnalogSource.KeyForce || data.data.source === AnalogSource.Momentary || data.data.source === AnalogSource.Toggle}
                <div class="action-setting-slot">
                    <span>Velocity Range</span>

                    <NumericUpDown bind:value={data.data.begin} min={0} max={127}/>
                    <NumericUpDown bind:value={data.data.end} min={0} max={127}/>
                </div>
            {:else if data.data.source === AnalogSource.Persistent}
                <div class="action-setting-slot">
                    <span>Velocity Value</span>
                    <NumericUpDown bind:value={data.data.end} min={0} max={127}/>
                </div>
            {/if}
        {:else if data.type === MidiType.PitchBend}
            <div class="action-setting-slot">
                <span>Channel</span>
                <NumericUpDown bind:value={data.data.channel} min={1} max={16}/>
            </div>

            <div class="action-setting-slot">
                <span>Pitch Source</span>

                <DropDown options={AnalogSourceMap} bind:value={data.data.source}/>
            </div>

            {#if data.data.source === AnalogSource.KeyForce || data.data.source === AnalogSource.Momentary || data.data.source === AnalogSource.Toggle}
                <div class="action-setting-slot">
                    <span>Pitch Range</span>

                    <FloatUpDown bind:value={data.data.begin} min={-1.0} max={1.0}/>
                    <FloatUpDown bind:value={data.data.end} min={-1.0} max={1.0}/>
                </div>
            {:else if data.data.source === AnalogSource.Persistent}
                <div class="action-setting-slot">
                    <span>Pitch</span>
                    <FloatUpDown bind:value={data.data.end} min={-1.0} max={1.0}/>
                </div>
            {/if}
        {:else if data.type === MidiType.RPN || data.type === MidiType.NRPN}
            <div class="action-setting-slot">
                <span>Channel</span>
                <NumericUpDown bind:value={data.data.channel} min={1} max={16}/>
            </div>

            <div class="action-setting-slot">
                <span>Control</span>

                <NumericUpDown bind:value={data.data.control} min={0} max={16383}/>
            </div>

            <div class="action-setting-slot">
                <span>Value Source</span>

                <DropDown options={AnalogSourceMap} bind:value={data.data.source}/>
            </div>

            {#if data.data.source === AnalogSource.KeyForce || data.data.source === AnalogSource.Momentary || data.data.source === AnalogSource.Toggle}
                <div class="action-setting-slot">
                    <span>Value Range</span>

                    <NumericUpDown bind:value={data.data.begin} min={0} max={16383}/>
                    <NumericUpDown bind:value={data.data.end} min={0} max={16383}/>
                </div>
            {:else if data.data.source === AnalogSource.Persistent}
                <div class="action-setting-slot">
                    <span>Value</span>
                    <NumericUpDown bind:value={data.data.end} min={0} max={16383}/>
                </div>
            {/if}
        {:else if data.type === MidiType.Sysex}
            <div class="action-setting-slot">
                <span>Data</span>

                <input type="text" bind:value={data.data.sysex}/>
            </div>
        {:else if data.type === MidiType.Start || data.type === MidiType.Continue || data.type === MidiType.Stop || data.type === MidiType.Reset}
            <!-- No additional settings -->
        {:else}
            <div class="action-setting-slot">
                <span>Unknown Type</span>
            </div>
        {/if}

    </div>
</ActionTemplate>