import html2canvas from 'html2canvas';

export interface ExportOptions {
  element: HTMLElement;
  fileName?: string;
  format?: 'png' | 'jpg';
  scale?: number;
}

export const exportPostcardImage = async ({
  element,
  fileName = 'postlovebd-postcard',
  format = 'png',
  scale = 2.5,
}: ExportOptions): Promise<void> => {
  try {
    const canvas = await html2canvas(element, {
      scale: Math.min(scale, 3), // high resolution / HD
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      imageTimeout: 15000,
      onclone: (clonedDoc) => {
        // Ensure fonts and safe visibility
        const clonedElement = clonedDoc.querySelector('[data-postcard-container="true"]');
        if (clonedElement) {
          (clonedElement as HTMLElement).style.boxShadow = 'none';
        }
      },
    });

    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const quality = format === 'jpg' ? 0.95 : undefined;
    const dataUrl = canvas.toDataURL(mimeType, quality);

    const link = document.createElement('a');
    link.download = `${fileName}-${Date.now()}.${format}`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to export postcard image:', error);
    throw error;
  }
};
