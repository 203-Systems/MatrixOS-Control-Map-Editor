<script lang="ts">
    import type { MacroActionData } from "./MacroActionData";
    import ActionTemplate from "../ActionTemplate.svelte";
    import {createEventDispatcher} from 'svelte';
    import {MacroAction} from "./MacroAction";
    import '../Action.css';

    const dispatch = createEventDispatcher();
    export let data: MacroActionData;
</script>

<ActionTemplate actionTitle={MacroAction.description} on:removeAction={() => dispatch('removeAction')}>
    <div class="action-settings">
        <div class="macro-setting-slot">
            <span>Script:</span>
            <div 
                class="auto-expand" 
                contenteditable="true" 
                role="textbox" 
                aria-multiline="true"
            >
                <!-- Placeholder text -->
            </div>
        </div>
    </div>
</ActionTemplate>

<style lang="scss">
.macro-setting-slot {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 12px;

    font-family: Roboto, sans-serif;
    font-size: 14px;
    flex-direction: column; /* Stack the children vertically */
    margin-bottom: 12px; /* Add spacing between slots */
}

.auto-expand {
    width: 100%; /* Full width */
    min-height: 40px; /* Start height */
    padding: 8px;
    font-size: 14px;
    box-sizing: border-box; /* Include padding in dimensions */
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden; /* Hide scrollbars */
    white-space: pre-wrap; /* Preserve line breaks */
    word-wrap: break-word; /* Wrap long words */
    outline: none; /* Remove focus outline */
}

.auto-expand:focus {
    border-color: #007BFF; /* Optional: Highlight border on focus */
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.25); /* Optional: Subtle focus glow */
}
</style>