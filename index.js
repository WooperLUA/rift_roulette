let champions;
let lanes;
let builds;

fetch('../data/champions.json')
    .then(response => response.json())
    .then(data => {
        champions = data;
    })

fetch('../data/lanes.json')
    .then(response => response.json())
    .then(data => {
        lanes = data;
    })

fetch('../data/build_types.json')
    .then(response => response.json())
    .then(data => {
        builds = data;
    })

console.log(champions);

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

    const champResult = spinSlot(champSlot, champions, 2000);
    const laneResult = spinSlot(laneSlot, lanes, 2500);
    const buildResult = spinSlot(buildSlot, builds, 3000);

    const [champ, lane, build] = await Promise.all([champResult, laneResult, buildResult]);

    spinBtn.disabled = false;
});