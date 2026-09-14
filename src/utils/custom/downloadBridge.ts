// downloadBridge.ts
declare global {
  interface Window {
    AndroidDownloader?: {
      downloadFile: (url: string, fileName: string, authHeader: string) => void;
    };
  }
}

export function downloadPdf(fileUrl: string, fileName: string) {
  const token = localStorage.getItem('accessToken'); // wherever you keep it
  const authHeader = token ? `Bearer ${token}` : '';

  if (window.AndroidDownloader?.downloadFile) {
    // Running inside the Android app — hand off to native code
    window.AndroidDownloader.downloadFile(fileUrl, fileName, authHeader);
  } else {
    // Normal browser — the plain anchor download attribute works fine here
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}