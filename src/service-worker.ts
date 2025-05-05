import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');

  wb.addEventListener('installed', (event) => {
    if (event.isUpdate) {
      if (confirm('New content is available! Click OK to refresh.')) {
        window.location.reload();
      }
    }
  });

  wb.register();
} 