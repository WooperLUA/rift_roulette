export {play_sound, pause_sound}

let current_sound;

function play_sound(file_name, volume = 1)
{
    current_sound = new Audio('./audio/' + file_name + '.mp3');
    if (current_sound)
    {
        current_sound.volume = volume
        current_sound.play();
    }

}

function pause_sound()
{
    if (current_sound)
    {
        current_sound.pause();
        current_sound.load();
    }
}
