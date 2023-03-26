# MP3 Player

A simple web-based MP3 player that allows you to play, pause, and control the playback of tracks in a selected folder. It features a fixed-height scrollable playlist, playback controls, and an audio visualizer.

![MP3 Player Demo](images/chatgpt-mp3.gif)

## Features

- Play, pause, and control MP3 playback
- Display a fixed-height scrollable playlist
- Show an audio visualizer while playing music
- Display the current playing track using a marquee

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/your-username/mp3-player.git
    cd mp3-player
    ```

2. Install dependencies:

    ```
    npm intall
    ```

3. Create a `music` folder in the root directory of the project and place your MP3 files there. Alternatively, you can specify a different folder when starting the server.

4. Start the server:
    ```
   node server.js
    ```

If you want to use a different folder for MP3 files, provide the folder path as an argument:
```
node server.js /path/to/your/mp3/folder
```

5. Open your browser and navigate to `http://localhost:3000` to use the MP3 player.

## License

This project is licensed under the MIT License.
