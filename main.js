const { app, BrowserWindow, session } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true, // Set to false if you want a borderless overlay vibe
        transparent: true, // Enable transparency if you want to verify it works
        webPreferences: {
            nodeIntegration: true,
        }
    })

    // 1. THE MAGIC FIX: Auto-approve MIDI permissions
    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
        if (permission === 'midi' || permission === 'midiSysex') {
            return callback(true) // ✅ Automatically say YES
        }
        callback(false)
    });

    // 2. Load your Next.js dev server
    // Make sure you run 'npm run dev' in a separate terminal first!
    win.loadURL('http://localhost:3000')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
