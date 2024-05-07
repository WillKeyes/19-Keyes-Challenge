const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the 'beforeinstallprompt' event
let deferredPrompt; 

window.addEventListener('beforeinstallprompt', (event) => {

    event.preventDefault();

    deferredPrompt = event;

    butInstall.style.display = 'block';
});


butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {

        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;

        console.log(`User response to the install prompt: ${outcome}`);

        deferredPrompt = null;
    }

    butInstall.style.display = 'none';
});


window.addEventListener('appinstalled', (event) => {
 
    console.log('PWA has been installed');
});
