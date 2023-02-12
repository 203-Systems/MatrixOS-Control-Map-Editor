import { SvelteComponent } from 'svelte';
import { Keyboard, Music } from "carbon-icons-svelte";

import MidiNoteAction from "./MidiAction.svelte";
import KeyboardAction from "./KeyboardAction.svelte";

export type ActionMeta = {
    actionName: string,
    actionIdentifier: string,
    actionIcon: SvelteComponent, 
    action: SvelteComponent
    
}

export const actions : {[actionIdentifier:string]: ActionMeta} = {
    "action.note":      { actionName: "Play a Midi Note", actionIdentifier: "action.note", actionIcon: Music, action: MidiNoteAction},
    "action.keyboard":  { actionName: "Simulate a Keyboard Key", actionIdentifier: "action.keyboard", actionIcon: Keyboard, action: MidiNoteAction},
} as const;
