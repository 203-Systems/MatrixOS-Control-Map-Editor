import { SvelteComponent } from 'svelte';
import MidiNoteAction from "./MidiAction.svelte";
import KeyboardAction from "./KeyboardAction.svelte";

export let actions : {[actionIdentifier:string]: SvelteComponent} = {
    "action.note": MidiNoteAction,
    "action.keyboard": KeyboardAction
} as const;
