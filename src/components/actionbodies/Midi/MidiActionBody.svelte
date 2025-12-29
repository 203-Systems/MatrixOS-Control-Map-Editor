<script lang="ts">
    import type { MidiActionData } from "./MidiActionData";
    import { AnalogSource, MidiType, MidiTypeMap, AnalogSourceMap } from "./MidiActionData";
    import ActionTemplate from "../ActionTemplate.svelte";
    import DropDown from "../../common/DropDown.svelte";
    import {createEventDispatcher} from 'svelte';
    import NumericUpDown from "../../common/NumericUpDown.svelte";
    import FloatUpDown from "../../common/FloatUpDown.svelte";
    import CheckBox from "../../common/CheckBox.svelte";
    import {MidiAction, SysexToByteArray} from "./MidiAction";
    import '../Action.css';

    import {t} from "$lib/translations";

    const dispatch = createEventDispatcher();
    
    export let data: MidiActionData;

    let sysexParseResult: Uint8Array | Error | null = null;

    function sysexUpdated(type: MidiType, sysex?: string | null) {
        if (type !== MidiType.Sysex) {
            sysexParseResult = null;
            return;
        }

        sysexParseResult = SysexToByteArray(sysex);
    }


    function changeMidiActionType(type: MidiType): void {
        console.log("Changing type to " + type);
        data.type = type;
        switch (type) {
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
                break;

            default:
                console.log("unknown type");
        }
    }

  $: sysexUpdated(data?.type, (data?.data as { sysex?: string } | null)?.sysex);
</script>

<ActionTemplate actionTitle={$t('midi.title')} on:removeAction={() => dispatch('removeAction')}>
    <div class="action-settings">
        <div class="action-setting-slot">
            <span>{$t('midi.body.message_type')}</span>

            <DropDown options={MidiTypeMap} bind:value={data.type} on:changed={e => changeMidiActionType(e.detail.option)}/>
        </div>

        {#if data.type === MidiType.Note}
            <div class="action-setting-slot">
                <span>{$t('midi.body.channel')}</span>
                <NumericUpDown bind:value={data.data.channel} min={1} max={16}/>
            </div>

            <div class="action-setting-slot">
                <span>{$t('midi.body.note')}</span>

                <NumericUpDown bind:value={data.data.note} min={0} max={127}/>
            </div>

            <div class="action-setting-slot">
                <span>{$t('midi.body.velocity_source')}</span>

                <DropDown options={AnalogSourceMap} bind:value={data.data.source}/>
            </div>

            {#if data.data.source === AnalogSource.KeyForce || data.data.source === AnalogSource.Momentary || data.data.source === AnalogSource.Toggle}
                <div class="action-setting-slot">
                    <span>{$t('midi.body.velocity_range')}</span>

                    <NumericUpDown bind:value={data.data.begin} min={0} max={127}/>
                    <NumericUpDown bind:value={data.data.end} min={0} max={127}/>
                </div>
            {:else if data.data.source === AnalogSource.Persistent}
                <div class="action-setting-slot">
                    <span>{$t('midi.body.velocity_value')}</span>
                    <NumericUpDown bind:value={data.data.end} min={0} max={127}/>
                </div>
            {/if}
            
        {:else if data.type === MidiType.ControlChange}
            <div class="action-setting-slot">
                <span>{$t('midi.body.channel')}</span>
                <NumericUpDown bind:value={data.data.channel} min={1} max={16}/>
            </div>
            
            <div class="action-setting-slot">
                <span>{$t('midi.body.control')}</span>

                <NumericUpDown bind:value={data.data.control} min={0} max={127}/>
            </div>

            <div class="action-setting-slot">
                <span>{$t('midi.body.value_source')}</span>

                <DropDown options={AnalogSourceMap} bind:value={data.data.source}/>
            </div>

            {#if data.data.source === AnalogSource.KeyForce || data.data.source === AnalogSource.Momentary || data.data.source === AnalogSource.Toggle}
                <div class="action-setting-slot">
                    <span>{$t('midi.body.value_range')}</span>

                    <NumericUpDown bind:value={data.data.begin} min={0} max={127}/>
                    <NumericUpDown bind:value={data.data.end} min={0} max={127}/>
                </div>
            {:else if data.data.source === AnalogSource.Persistent}
                <div class="action-setting-slot">
                    <span>{$t('midi.body.value')}</span>
                    <NumericUpDown bind:value={data.data.end} min={0} max={127}/>
                </div>
            {/if}

        {:else if data.type === MidiType.ProgramChange}
            <div class="action-setting-slot">
                <span>{$t('midi.body.channel')}</span>
                <NumericUpDown bind:value={data.data.channel} min={1} max={16}/>
            </div>
            
            <div class="action-setting-slot">
                <span>{$t('midi.body.control')}</span>

                <NumericUpDown bind:value={data.data.control} min={0} max={127}/>
            </div>

        {:else if data.type === MidiType.ChannelPressure}
            <div class="action-setting-slot">
                <span>{$t('midi.body.channel')}</span>
                <NumericUpDown bind:value={data.data.channel} min={1} max={16}/>
            </div>

            <div class="action-setting-slot">
                <span>{$t('midi.body.velocity_source')}</span>

                <DropDown options={AnalogSourceMap} bind:value={data.data.source}/>
            </div>

            {#if data.data.source === AnalogSource.KeyForce || data.data.source === AnalogSource.Momentary || data.data.source === AnalogSource.Toggle}
                <div class="action-setting-slot">
                    <span>{$t('midi.body.velocity_range')}</span>

                    <NumericUpDown bind:value={data.data.begin} min={0} max={127}/>
                    <NumericUpDown bind:value={data.data.end} min={0} max={127}/>
                </div>
            {:else if data.data.source === AnalogSource.Persistent}
                <div class="action-setting-slot">
                    <span>{$t('midi.body.velocity_value')}</span>
                    <NumericUpDown bind:value={data.data.end} min={0} max={127}/>
                </div>
            {/if}
        {:else if data.type === MidiType.PitchBend}
            <div class="action-setting-slot">
                <span>{$t('midi.body.channel')}</span>
                <NumericUpDown bind:value={data.data.channel} min={1} max={16}/>
            </div>

            <div class="action-setting-slot">
                <span>{$t('midi.body.pitch_source')}</span>

                <DropDown options={AnalogSourceMap} bind:value={data.data.source}/>
            </div>

            {#if data.data.source === AnalogSource.KeyForce || data.data.source === AnalogSource.Momentary || data.data.source === AnalogSource.Toggle}
                <div class="action-setting-slot">
                    <span>{$t('midi.body.pitch_range')}</span>

                    <FloatUpDown bind:value={data.data.begin} min={-1.0} max={1.0}/>
                    <FloatUpDown bind:value={data.data.end} min={-1.0} max={1.0}/>
                </div>
            {:else if data.data.source === AnalogSource.Persistent}
                <div class="action-setting-slot">
                    <span>{$t('midi.body.pitch')}</span>
                    <FloatUpDown bind:value={data.data.end} min={-1.0} max={1.0}/>
                </div>
            {/if}
        {:else if data.type === MidiType.RPN || data.type === MidiType.NRPN}
            <div class="action-setting-slot">
                <span>{$t('midi.body.channel')}</span>
                <NumericUpDown bind:value={data.data.channel} min={1} max={16}/>
            </div>

            <div class="action-setting-slot">
                <span>{$t('midi.body.control')}</span>

                <NumericUpDown bind:value={data.data.control} min={0} max={16383}/>
            </div>

            <div class="action-setting-slot">
                <span>{$t('midi.body.value_source')}</span>

                <DropDown options={AnalogSourceMap} bind:value={data.data.source}/>
            </div>

            {#if data.data.source === AnalogSource.KeyForce || data.data.source === AnalogSource.Momentary || data.data.source === AnalogSource.Toggle}
                <div class="action-setting-slot">
                    <span>{$t('midi.body.value_range')}</span>

                    <NumericUpDown bind:value={data.data.begin} min={0} max={16383}/>
                    <NumericUpDown bind:value={data.data.end} min={0} max={16383}/>
                </div>
            {:else if data.data.source === AnalogSource.Persistent}
                <div class="action-setting-slot">
                    <span>{$t('midi.body.value')}</span>
                    <NumericUpDown bind:value={data.data.end} min={0} max={16383}/>
                </div>
            {/if}
        {:else if data.type === MidiType.Sysex}
            <div class="action-setting-slot">
                <span>{$t('midi.body.data')}</span>

                <textarea class="sysex-input {sysexParseResult instanceof Error ? 'sysex-input-error' : ''}" bind:value={data.data.sysex}/>
            </div>
            {#if sysexParseResult instanceof Error}
            <div class="action-error-box">
                <span>{sysexParseResult.message}</span>
            </div>
            {/if}
        {:else if data.type === MidiType.Start || data.type === MidiType.Continue || data.type === MidiType.Stop || data.type === MidiType.Reset}
            <!-- No additional settings -->
        {:else}
            <div class="action-setting-slot">
                <span>{$t('midi.body.unknown_type')}</span>
            </div>
        {/if}

    </div>
</ActionTemplate>

<style lang="scss"> 
    .sysex-input {
        box-sizing: border-box;  /* includes padding and border in the overall height */
        min-height: 32px;
        height: 32px;
        margin-top: 4px;
        margin-bottom: 4px;
        max-width: 240px;
        border-radius: 6px;
        background: white;
        border: 1px solid gray;
        padding: 8px;
        resize: vertical; /* disables the manual resize handle */
        overflow: hidden; /* hides the scrollbar */
        white-space: pre-wrap; /* preserves and wraps whitespace */

        font-family: Inter, sans-serif;
        font-size: 14px;

        transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;

        
        &:focus {
            outline: none;
            box-shadow: none;
            border-color: inherit; /* or set it to your desired color */
        }
    }

    
    .sysex-input-error
    {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #721c24;
    }

    .action-error-box {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 12px 12px;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 6px;
        border-radius: 6px;

        font-family: Roboto, sans-serif;
        font-size: 14px;

        span {    
            text-align: center;
        }
    }
</style>
