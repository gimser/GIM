export function stripDataUrlPrefix(base64WithPrefix: string) {
  const commaIdx = base64WithPrefix.indexOf(",");
  return commaIdx >= 0 ? base64WithPrefix.slice(commaIdx + 1) : base64WithPrefix;
}

export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
