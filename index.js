import * as audio_handler from './audio_handler.js'

// For some obscure reasons GitHub cant serve .json so i guess it is gonna be js
import {champions} from "./data/github_json_champions.js"
import {lanes} from "./data/github_json_lanes.js"
import {build_types} from "./data/github_json_build_types.js"


const champSlot = document.getElementById('champSlot');
const laneSlot = document.getElementById('laneSlot');
const buildSlot = document.getElementById('buildSlot');
const spinBtn = document.getElementById('spinBtn');

function getRandom(arr)
{
    return arr[Math.floor(Math.random() * arr.length)];
}

function spinSlot(slotElem, items, duration)
{
    return new Promise((resolve) => {
        let elapsed = 0;
        const intervalTime = 50; // update every 50ms
        const interval = setInterval(() => {
            slotElem.textContent = getRandom(items);
            elapsed += intervalTime;
            if (elapsed >= duration) {
                clearInterval(interval);
                // Final pick
                audio_handler.play_sound('funny_taunt', 0.2)
                const finalPick = getRandom(items);
                slotElem.textContent = finalPick;
                resolve(finalPick);
            }
        }, intervalTime);
    });
}

spinBtn.addEventListener('click', async () =>
{
    spinBtn.disabled = true;

    audio_handler.play_sound('very_humoristic_drum_roll', 0.4)

    const champResult = spinSlot(champSlot, champions, 2000);
    const laneResult = spinSlot(laneSlot, lanes, 2500);
    const buildResult = spinSlot(buildSlot, build_types, 3000);

    const [champ, lane, build] = await Promise.all([champResult, laneResult, buildResult]);

    spinBtn.disabled = false;
});